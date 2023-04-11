import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

export async function getRedditVideoLinks(baseUrl: string): Promise<{
	videoLinks: { baseUrl: string; width: string; height: string }[];
	audioLink: string | null;
}> {
	const metadataUrl = `${baseUrl}DASHPlaylist.mpd`;
	const res = await fetch(metadataUrl);
	const xml = await res.text();

	const alwaysArray = ['MPD.Period.AdaptationSet', 'MPD.Period.AdaptationSet.Representation'];

	const parser2 = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: '@_',
		isArray: (_name, jpath) => {
			if (alwaysArray.indexOf(jpath) !== -1) return true;
			return false;
		}
	});

	type MPD = {
		MPD: {
			Period: {
				AdaptationSet: {
					'@_contentType': string;
					Representation: {
						'@_width': string;
						'@_height': string;
						BaseURL: string;
					}[];
				}[];
			};
		};
	};

	const obj: MPD = parser2.parse(xml);

	const adaptationSets = obj.MPD.Period.AdaptationSet;

	let videoAdaptationSet: MPD['MPD']['Period']['AdaptationSet'][0] = {
		'@_contentType': '',
		Representation: []
	};
	let audioAdaptationSet;
	for (let i = 0; i < adaptationSets.length; i++) {
		if (adaptationSets[i]['@_contentType'] === 'video') {
			videoAdaptationSet = adaptationSets[i];
		} else if (adaptationSets[i]['@_contentType'] === 'audio') {
			audioAdaptationSet = adaptationSets[i];
		}
	}

	const videoBaseUrls: { baseUrl: string; width: string; height: string }[] = [];
	for (let i = 0; i < videoAdaptationSet['Representation'].length; i++) {
		videoBaseUrls.push({
			baseUrl: videoAdaptationSet['Representation'][i]['BaseURL'],
			width: videoAdaptationSet['Representation'][i]['@_width'],
			height: videoAdaptationSet['Representation'][i]['@_height']
		});
	}

	let audioBaseUrl: string | null = null;
	if (audioAdaptationSet) {
		audioBaseUrl = audioAdaptationSet['Representation'][0]['BaseURL'];
	}

	return { videoLinks: videoBaseUrls, audioLink: audioBaseUrl };
}
