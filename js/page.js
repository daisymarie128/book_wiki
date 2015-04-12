var pageCreation = function(){
	var Page = (function() {

	var $container = $( '#container' ),
		$bookBlock = $( '#bb-bookblock' ),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,
		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old, page, isLimit) {

				current = page;
				// update TOC current
				updateTOC();
				// updateNavigation
				updateNavigation( isLimit );
				// initialize jScrollPane on the content div for the new item
				setJSP( 'init' );
				// destroy jScrollPane on the content div for the old item
				setJSP( 'destroy', old );

			}
		} ),
		$navNext = $( '#bb-nav-next' ),
		$navPrev = $( '#bb-nav-prev' ).hide(),
		$menuItems = $container.find( 'ul.menu-toc > li' ),
		$tblcontents = $( '#tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;

		// console.log('items count', itemsCount)

	function init() {

		// initialize jScrollPane on the content div of the first item
		setJSP( 'init' );
		initEvents();

	}

	function initEvents() {

		// add navigation events
		$navNext.on( 'click', function() {
			addTimelineImages();
			bb.next();
			return false;
		} );

		$navPrev.on( 'click', function() {
			bb.prev();
			return false;
		} );

		// add swipe events
		$items.on( {
			'swipeleft'		: function( event ) {
				if( $container.data( 'opened' ) ) {
					colorRandom()
					return false;
				}
				addTimelineImages();
				bb.next();
				return false;
			},
			'swiperight'	: function( event ) {
				if( $container.data( 'opened' ) ) {
					colorRandom()
					return false;
				}
				bb.prev();
				return false;
			}
		} );

		// show table of contents
		$tblcontents.on( 'click', toggleTOC );

		// click a menu item
		$menuItems.on( 'click', function() {

			var $el = $( this ),
				idx = $el.index(),
				jump = function() {
					timelineImageFromMenu(idx);
					bb.jump( idx + 1 );
				};
			// console.log(idx)
			current !== idx ? closeTOC( jump ) : closeTOC();

			return false;

		} );

		// reinit jScrollPane on window resize
		$( window ).on( 'debouncedresize', function() {
			// reinitialise jScrollPane on the content div
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {

		var idx = idx === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );

		var $menuContainer = $container.find( 'div.menu-panel' ),
			$menuContent = $menuContainer.eq( idx ).children('ul.menu-toc'),
			apiJSP_menu = $menuContent.data( 'jsp' );

		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
			$menuContent.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	function updateTOC() {
		$menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	}

	function updateNavigation( isLastPage ) {

		if( current === 0 ) {
			$navNext.show();
			$navPrev.hide();
		}
		else if( isLastPage ) {
			$navNext.hide();
			$navPrev.show();
		}
		else {
			$navNext.show();
			$navPrev.show();
		}

	}

	function colorRandom() {
		console.log('i get here')
		var anchors = document.getElementsByTagName("a");
		var colors = ['#1E88E5', '#9C27B0', '#E91E63', '#26A69A', '#26C6DA']
		var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

		for (_i = 0; _i < anchors.length; _i++) {
		    var textTag = anchors[_i].style.color = colors[Math.floor(Math.random() * 5)];;
		}
	}

	function toggleTOC() {
		var opened = $container.data( 'opened' );
		opened ? closeTOC() : openTOC();
	}

	function openTOC() {
		$navNext.hide();
		$navPrev.hide();
		$container.addClass( 'slideRight' ).data( 'opened', true );
	}

	function closeTOC( callback ) {

		updateNavigation( current === itemsCount - 1 );
		$container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$container.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}

	return { init : init };

})();


	Page.init();
}
