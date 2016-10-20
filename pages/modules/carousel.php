<!-- Wrapper for slides -->
<!-- ko if:images().length > 0 -->
<div id="mainCarousel" class="carousel slide auto" data-ride="carousel" data-interval="4000">
	  <ol class="carousel-indicators" data-bind="foreach: images">
		<li data-target="#mainCarousel" data-bind="attr:{
			'data-slide-to': $index()
		}, css:{
			'active': $index() == 0
		}"></li>
	  </ol>
		
	  <div class="carousel-inner" data-bind="foreach: images">
	  <div class="item" data-bind="css:{
		  'active': $index() == 0
	  }">
		<!-- ko if: $data.indexOf('events/') > -1 --> 
		<a target='_blank' data-bind="attr:{href: 'pages/'+$data }">
		<img alt="Slide" data-bind="attr:{src: 'img/carousel/' + $data}" />
		</a>
		<!-- /ko -->
		
		<!-- ko if: $data.indexOf('events/') == -1 --> 
		<img alt="Slide" data-bind="attr:{src: 'img/carousel/' + $data}" />
		<!-- /ko -->
	  </div>
	  </div>
	  <a class="left carousel-control" href="#mainCarousel" role="button" data-slide="prev">
		<span class="glyphicon glyphicon-chevron-left"></span>
	  </a>
	  <a class="right carousel-control" href="#mainCarousel" role="button" data-slide="next">
		<span class="glyphicon glyphicon-chevron-right"></span>
	  </a>
</div>
<!-- /ko -->
