jQuery(function ($) {
	$.fn.hider = function (opt) {
	
		var e = this, options = $.extend({ 
			'hide': 'a.hide',
			'hideEvent': 'click',
			'hideReturn': false,
			'ajaxUrl': '/',
			'ajaxType': 'POST',
			'ajaxSuccess': function (data) {
				return;
			},
			'ajaxError': function () {
				alert('Hmmm, there was an error');
			},
			'slide': function () {
				this.slideUp(200, function () {
					$(this).remove();
				});
			},
			'confirm': function () {
				return confirm('Are you sure you want to hide this?');
			}
		}, opt);
	
		this.confirm = function (clicked) {
			if(options.confirm())
			{
				this.trigger(clicked);
			}
			return this;
		};
	
		this.sort = function (clicked) {
			var sel = $(e);
			if ($(clicked).attr('data-type'))
			{
				sel = $(e).filter('[data-' + $(clicked).attr('data-type') + '="' + $(e).attr('data-' + $(clicked).attr('data-type')) + '"]');
			}
		
			options.slide.call(sel);
			return this;
		
		}
	
		this.trigger = function (clicked) {
			if (options.ajaxUrl)
			{
				$.ajax({
					'type': options.ajaxType,
					'url': options.ajaxUrl,
					'success': function (data)
					{
						e.sort(clicked);
						options.ajaxSuccess(data);
					},
					'error': function ()
					{
						options.ajaxError();
					}
				});	
			}
			else
			{
				e.sort(clicked);
			}
		};
	
		return this.each(function () {
			$(this).find(options.hide).bind(options.hideEvent, function () {
				e.confirm(this);
				return options.hideReturn;
			});
		});
	};
});