<section class="calendar">

<div class="calendar-container"></div>
<div class="event-detail">
	<!-- ko if: selectedEvents() !== null && selectedEvents().length > 0 -->
	<!-- ko foreach: selectedEvents() -->

	<!-- ko if: $data.image -->
	<img data-bind="attr:{'src': $data.image }"/>
	<!-- /ko -->
	
	<!-- ko if: $data.description -->
	<h2 data-bind="text:$data.title"></h2>
	<p data-bind="text: $data.description"></p>
	<!-- /ko -->
	
	<hr/>
	<!-- /ko -->
	<!-- /ko -->
	
	<!-- ko if: selectedEvents() == null || selectedEvents().length == 0 -->
	<h3>Selectionner un évènement</h3>
	<!-- /ko -->
	
</div>

</section>