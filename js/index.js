$(document).ready(function () {
	// api call
	$.ajax({
	    url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&rvprop=content&titles=Martin_Luther_King_Jr.",
	    jsonp: "callback",
	    dataType: "jsonp",
	    data: {
	        q: "select title,abstract,url from search.news where query=\"cat\"",
	        format: "json"
	    },

	    success: function( response, status ) {

	    	// editing text
	        text = response.query.pages['20076'].extract
	        var find = '\[\[(\w|\s|\|)*\]\]';
			var re = new RegExp(find);

	        text = text.replace(/<i>/g, '<a href="#">')
	        text = text.replace(/<\/i>/g, '</a>')
	        text = text.replace(/<h3>/g, '<br><a href="#">')
	        text = text.replace(/<\/h3>/g, '</a>')

	        paragraphs = [];
	        paragraphs.push(
	        	text.split('<h2>')
        	)
	         // loop through array of paragraphs(sections) and add to pages
			for (var i = 1; i < paragraphs[0].length; i++) {

				var page = $('<div></div>').addClass('bb-item').attr('id','item' + i);
				var content = $('<div></div>').addClass('content');
				var content2 = $('<div></div>').addClass('contentRight content' + i);
				var scroller =  $('<div></div>').addClass('scroller').attr('id','bb-bookblock');
				var scroller2 = $('<div></div>').addClass('scroller2');

				scroller.innerHTML = paragraphs[0][i];
				scroller2.innerHTML = 'this is my picture';

				content.append(scroller.innerHTML)
				content2.append(scroller2)
				page.append(content)
				page.append(content2)

				var section_title = paragraphs[0][i].match(/<[^<]+?>(.*?)<\/span>/i)[1];
					section_link = $('<a></a>').attr('href', '#item' + i).append(section_title);
					section = $('<li></li>').append(section_link);

				$('.menu-toc').append(section);
				$('.bb-bookblock').append(page);

				if(i === paragraphs[0].length - 1){
					pageCreation();
				}

				$('#bb-nav-next').click(function(){
					randomizeColor();
				});

				$('#bb-nav-prev').click(function(){
					randomizeColor();
				});

			};
			addImagesToPages();
	    }
	});

});


function randomizeColor() {
	var anchors = document.getElementsByTagName("a");
	var colors = ['#1E88E5', '#9C27B0', '#E91E63', '#26A69A', '#26C6DA']
	var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

	for (_i = 0; _i < anchors.length; _i++) {
	    var textTag = anchors[_i].style.color = colors[Math.floor(Math.random() * 5)];;
	}
}

function addTimelineImages(){

	var sectionId = $('.bb-item:visible').attr('id');
	var sectionNumber = sectionId.match(/item(.*)/)[1];

	for(y = 1; y <= parseInt(sectionNumber)+1 ; y++){
		$('#timeline-icons').children()[y].style.display = 'inline-block';
	}
};

function timelineImageFromMenu(sectionId){
	for(y = 1; y <= sectionId ; y++){
		$('#timeline-icons').children()[y].style.display = 'inline-block';
	}
}

function addImagesToPages() {
	var martin = $('<img>').addClass('martinBig').attr('src', 'images/martinPage1-01.png');
	$('.content1').append(martin);

	var marriedBig = $('<img>').addClass('marriedBig').attr('src','images/marriedPage2-2-01.png');
	$('.content2').append(marriedBig);

	var mountain3Big = $('<img>').addClass('mountain3Big').attr('src', 'images/busPage4-01.png').css(
		zIndex= '0',
		width= '100%'
	);

	var mountainCloudTop3Big = $('<img>').addClass('mountainCloudTop3Big').attr('src', 'images/mountainCloudTop3Big.png').css(
		zIndex = '1',
		position = 'absolute'
	);

	$('.content3').append(mountain3Big);
	$('.content3').append(mountainCloudTop3Big);

	var imagePage4 = $('<img>').addClass('martinBig').attr('src', 'images/phonePage5-01.png');
	$('.content4').append(imagePage4);

	var soundPage5 = $('<button></button>').addClass('soundButton').html('Play sound')
	$('.content5').append(soundPage5);

	var playing = false;

	soundPage5.click(function(e){
		e.preventDefault();
		if(playing == false){
			$(this).html('Pause sound')
			playSound('I_Have_A_Dream');
			playing = true;
		} else {
			$(this).html('Play sound')
			pauseSound();
			playing = false;
		}
	});

	var imagePage5 = $('<img>').addClass('martinBig').attr('src', 'images/dreamPage8-01.png');
	$('.content5').append(imagePage5);

	var soundPage6 = $('<button></button>').addClass('soundButton').html('Play sound')
	$('.content6').append(soundPage6);

	soundPage6.click(function(e){
		e.preventDefault();
		if(playing == false){
			$(this).html('Pause sound')
			playSound('MLK_Selma');
			playing = true;
		} else {
			$(this).html('Play sound')
			pauseSound();
			playing = false;
		}
	})

	var imagePage6 = $('<img>').addClass('martinBig').attr('src', 'images/selmaPage6-01.png');
	$('.content6').append(imagePage6);

	var imagePage7 = $('<img>').addClass('martinBig').attr('src', 'images/jessyPage9-01.png');
	$('.content7').append(imagePage7);

	var imagePage8 = $('<img>').addClass('martinBig').attr('src', 'images/vietnamePage7-01.png');
	$('.content8').append(imagePage8);

	var imagePage9 = $('<img>').addClass('martinBig').attr('src', 'images/poorCampaignPage10-01.png');
	$('.content9').append(imagePage9);

	var imagePage10 = $('<img>').addClass('martinBig').attr('src', 'images/assasinationPage11-01.png');
	$('.content10').append(imagePage10);

	var imagePage11 = $('<img>').addClass('martinBig').attr('src', 'images/FBI-01.png');
	$('.content11').append(imagePage11);

}








