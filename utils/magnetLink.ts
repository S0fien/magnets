import {browser} from 'webextension-polyfill-ts';
import Magnet from '../types/magnet';

async function get(): Promise<Magnet[]> {
  const result = await browser.storage.local.get('magnets');
  return result.magnets ?? [];
}

async function deleteAll(): Promise<void> {
  await browser.storage.local.remove('magnets');
}

async function add(magnetLink: Magnet): Promise<void> {
  const links = await get();
  links.push(magnetLink);
  await browser.storage.local.set({magnets: links});
}

async function update(magnets: Magnet[]): Promise<void> {
  await browser.storage.local.set({magnets});
}

export {add, get, deleteAll, update};
