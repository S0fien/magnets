import 'emoji-log';
import {browser, Menus, Tabs} from 'webextension-polyfill-ts';
import {v4 as uuid} from 'uuid';
import isMagnet from '../../utils/isMagnet';
import {add} from '../../utils/magnetLink';

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed');

  const MENU_ID = 'magnets_add_link';

  browser.contextMenus.create({
    id: MENU_ID,
    title: 'Add magnet',
    contexts: ['link'],
  });

  browser.contextMenus.onClicked.addListener(
    // @ts-ignore
    async (info: Menus.OnClickData, tab: Tabs.Tab) => {
      if (info.menuItemId === MENU_ID) {
        // here's where you'll need the ID
        // do something
        const {linkUrl} = info;

        if (typeof linkUrl === 'string' && isMagnet(linkUrl)) {
          const {url: originUrl, favIconUrl} = tab;
          const magnet = {
            originUrl,
            favIconUrl,
            linkUrl,
            addedAt: Date.now(),
            selected: false,
            status: 'new',
            id: uuid(),
          };

          await add(magnet);
        }
      }
    }
  );
});
