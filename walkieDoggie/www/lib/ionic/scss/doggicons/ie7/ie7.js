/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'doggicons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-add': '&#xe600;',
		'icon-delete': '&#xe601;',
		'icon-check': '&#xe602;',
		'icon-arrow-left': '&#xe603;',
		'icon-arrow-right': '&#xe604;',
		'icon-chevron-left': '&#xe605;',
		'icon-chevron-right': '&#xe606;',
		'icon-chevron-bottom': '&#xe607;',
		'icon-chevron-top': '&#xe608;',
		'icon-clock': '&#xe609;',
		'icon-time': '&#xe60a;',
		'icon-activity': '&#xe60b;',
		'icon-feed': '&#xe60c;',
		'icon-goal': '&#xe60d;',
		'icon-report': '&#xe60e;',
		'icon-map': '&#xe60f;',
		'icon-user': '&#xe610;',
		'icon-group': '&#xe611;',
		'icon-edit': '&#xe612;',
		'icon-search': '&#xe613;',
		'icon-facebook': '&#xe614;',
		'icon-googleplus': '&#xe615;',
		'icon-tumblr': '&#xe616;',
		'icon-twitter': '&#xe617;',
		'icon-heart-filled': '&#xe618;',
		'icon-heart': '&#xe619;',
		'icon-star-filled': '&#xe61a;',
		'icon-star': '&#xe61b;',
		'icon-indicator': '&#xe61c;',
		'icon-care': '&#xe61d;',
		'icon-dog-friendly': '&#xe61e;',
		'icon-dog-toilet': '&#xe61f;',
		'icon-education': '&#xe620;',
		'icon-games': '&#xe621;',
		'icon-health': '&#xe622;',
		'icon-other': '&#xe623;',
		'icon-shopping': '&#xe624;',
		'icon-toxic': '&#xe625;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
