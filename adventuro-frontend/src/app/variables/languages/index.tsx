import {en} from './en';

export const langs = {
	en
};

export default function loadLang(lang = "en") {
	switch (lang) {
		default:
			return langs.en;
	}
};
