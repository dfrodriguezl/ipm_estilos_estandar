/**
 * Protocol for Google Map Tiles API (createSession + 2dtiles).
 * Tile URLs: google://{mapType}/{z}/{x}/{y}?key=...&layerType=...&overlay=...
 * Used by OpenLayers via tileLoadFunction.
 */

import TileState from 'ol/TileState';
import XYZ from 'ol/source/XYZ';
import { variables } from './variables';

const sessions = {};

const ensureSession = async (sessionKey, url) => {
  let value = sessions[sessionKey];
  if (value && !(value instanceof Promise)) {
    return value;
  }

  if (value instanceof Promise) {
    await value;
    return sessions[sessionKey];
  }

  const createPromise = (async () => {
    const key = url.searchParams.get('key');
    const mapType = url.hostname;
    const layerType = url.searchParams.get('layerType');
    const overlay = url.searchParams.get('overlay');

    const sessionRequest = {
      mapType,
      language: 'es',
      region: 'CO',
      scale: 'scaleFactor2x',
      highDpi: true,
    };

    if (layerType) {
      sessionRequest.layerTypes = [layerType];
    }
    if (overlay != null) {
      sessionRequest.overlay = overlay === 'true';
    }

    try {
      const response = await fetch(
        `https://tile.googleapis.com/v1/createSession?key=${encodeURIComponent(key)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sessionRequest),
        }
      );

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(
          `Google Map Tiles createSession failed (${response.status}): ${errText || response.statusText}`
        );
      }

      const result = await response.json();
      if (!result.session) {
        throw new Error('Google Map Tiles createSession returned no session token');
      }

      sessions[sessionKey] = result.session;
      return result.session;
    } catch (err) {
      delete sessions[sessionKey];
      throw err;
    }
  })();

  sessions[sessionKey] = createPromise;
  await createPromise;
  return sessions[sessionKey];
};

/**
 * Fetches a Google Map tile as ArrayBuffer from a google:// URL.
 * @param {{ url: string }} params
 * @returns {Promise<{ data: ArrayBuffer }>}
 */
export const googleProtocol = async (params) => {
  const url = new URL(params.url.replace(/^google:\/\//, 'https://'));
  const sessionKey = `${url.hostname}?${url.searchParams.toString()}`;
  const key = url.searchParams.get('key');

  if (!key) {
    throw new Error('google:// tile URL requires a key query parameter');
  }

  const session = await ensureSession(sessionKey, url);
  const tileResponse = await fetch(
    `https://tile.googleapis.com/v1/2dtiles${url.pathname}?session=${encodeURIComponent(session)}&key=${encodeURIComponent(key)}`
  );

  if (!tileResponse.ok) {
    throw new Error(`Google Map Tiles fetch failed (${tileResponse.status})`);
  }

  const data = await tileResponse.arrayBuffer();
  return { data };
};

/**
 * OpenLayers XYZ tileLoadFunction for google:// URLs.
 * @param {import('ol/ImageTile').default} imageTile
 * @param {string} src
 */
export const googleOlTileLoadFunction = (imageTile, src) => {
  const img = imageTile.getImage();
  if (!img) {
    imageTile.setState(TileState.ERROR);
    return;
  }

  googleProtocol({ url: src })
    .then(({ data }) => {
      const blob = new Blob([data]);
      const objectUrl = URL.createObjectURL(blob);
      const handleLoad = () => {
        URL.revokeObjectURL(objectUrl);
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
      const handleError = () => {
        URL.revokeObjectURL(objectUrl);
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
        imageTile.setState(TileState.ERROR);
      };
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
      img.src = objectUrl;
    })
    .catch((err) => {
      console.warn('googleOlTileLoadFunction:', err);
      imageTile.setState(TileState.ERROR);
    });
};

/**
 * @param {string} tileUrl
 * @returns {string}
 */
export const getBasemapAttribution = (tileUrl) =>
  typeof tileUrl === 'string' && tileUrl.startsWith('google://')
    ? '&copy; Google Maps'
    : 'Tiles &copy; Esri';

/**
 * @param {string} name
 * @returns {import('ol/source/XYZ').default}
 */
export const createBasemapSource = (name) => {
  const tileUrl = variables.baseMaps[name];
  const isGoogle = typeof tileUrl === 'string' && tileUrl.startsWith('google://');
  return new XYZ({
    url: tileUrl,
    crossOrigin: 'Anonymous',
    attributions: getBasemapAttribution(tileUrl),
    maxZoom: 22,
    tileSize: 256,
    ...(isGoogle ? { tileLoadFunction: googleOlTileLoadFunction } : {}),
  });
};

/**
 * Applies CSS filters for gris / dark on the base raster canvas only.
 * @param {string} name
 */
export const applyBasemapFilter = (name) => {
  const mapa = document.getElementById('mapa');
  if (!mapa) return;
  mapa.dataset.basemap = name;
};
