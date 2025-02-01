window.args = {
	sitekey   : 'd6f45a61df3101ca9033be5eddb4ae02',
	position  : 'Left',
	language  : 'HE',
	container : '',
	icon : '',
	access : 'https://vee-crm.com',
	styles : {
		primary_color: '#222222',
		secondary_color: '#fbbb33',
		background_color: '#f6f6f6',
		primary_text_color: '#4d4d4d',
		headers_text_color: '#fbbb33',
		primary_font_size: 14,
		slider_left_color:  '#b586ff',
		slider_right_color:  '#177fab',
		icon_vertical_position: 'top',
		icon_offset_top: 150,
		icon_offset_bottom: 0,
		highlight_focus_color: '#177fab',
		toggler_icon_color: '#ffffff',
	},
	links : {
		acc_policy: 'https://ramphysiotherapy.com/acc-policy-ram.docx',
		additional_link: 'https://vee.co.il/pricing/'
	},
	options : {
		open: false,
		aaa: false,
		hide_tablet: false,
		hide_mobile: false,
		button_size_tablet: 44,
		button_size_mobile: 40,
		position_tablet: 'Right',
		position_mobile: 'Right',
		icon_vertical_position_tablet: 'top',
		icon_vertical_position_mobile: 'top',
		icon_offset_top_tablet: 150,
		icon_offset_bottom_tablet: 0,
		icon_offset_top_mobile: 150,
		icon_offset_bottom_mobile: 0,
		keyboard_shortcut: true,
		hide_purchase_link: false,
		display_checkmark_icon: false,
		active_toggler_color: '#118f38'
	},
	exclude : []
};

(function(doc, head, body){
	var embed = doc.createElement('script');
	embed.src = window.args['access'] + '/js/';
	embed.defer = true;
	embed.crossOrigin = 'anonymous';
	embed.setAttribute('data-cfasync', true );
	body? body.appendChild(embed) : head.appendChild(embed);
})(document, document.head, document.body);

