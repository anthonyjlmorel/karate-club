<section class="calendar">

<div class="calendar-container"></div>
<div class="event-detail">
	<!-- ko if: selectedEvent() !== null -->
	<img data-bind="attr:{'src': selectedEvent().image }"/>
	<!-- /ko -->
	
	<!-- ko if: selectedEvent() == null -->
	<h3>Selectionner un évènement</h3>
	<!-- /ko -->
	
</div>

</section>