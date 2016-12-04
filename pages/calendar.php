<section class="calendar">
	<h1 data-bind="text: 'Saison ' + season() + '-' + (season()+1)"></h1>
	<div class="calendar-container">


	<div class="events-container">
	<div>
		<div class="day"></div>
		<div class="title"></div>
		<div class="links legend">
			<ul>
				<li><span>Affiche</span></li>
				<li><span>Photos</span></li>
				<li><span>Inscription</span></li>
			</ul>
		</div>
	</div>	
	</div>


	<!-- ko foreach: calendarData() -->
	<div>
		<h2 data-bind="text: $parent.monthNames[month-1]"></h2>
	</div>
	<div class="events-container">
		<!-- ko foreach: events -->
		<div>
			<div class="day" data-bind="text: date"></div>
			<div class="title">
				<h4 class="service-heading" data-bind="text: title"></h4>
				<p class="text-muted" data-bind="text: location"></p>
			</div>
			<div class="links clickable">
				<ul data-bind="foreach: Object.keys(links)">
					<li>
						<!-- ko if: $parent.links[$data] && $data != "photos" -->
						<a target="_blank" data-bind="attr:{'href': $parent.links[$data]}"></a>
						<!-- /ko -->
						
						<!-- ko if: $parent.links[$data] && $data == "photos" -->
						<a target="_blank" href="" data-bind="click: function(){
							showGallery($parent.links[$data]);
						}"></a>
						<!-- /ko -->
					</li>
				</ul>
			</div>
		</div>
		<!-- /ko -->
	</div>
	<!-- /ko -->

		
	</div>

</section>