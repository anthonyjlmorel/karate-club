<section class="container team">
	<div class="row">
		<div class="col-lg-12 text-center">
			<h2 class="section-heading">L'Equipe</h2>
		</div>
	</div>
	
	<div class="row">
	
	
	<!-- ko foreach: team -->
	
	<div class="col-xs-12 col-sm-5"  style="text-align:center;">
	
	  <img width="140" data-bind="attr:{src: '<?php echo IMGS_ADDR.'/team/'; ?>/'+ photo}" class="img-thumbnail" />
	  <p>
		<h4 data-bind="text: name"></h4>
	  <small data-bind="text: desc">
	  
	  </small>
	  </p>
	</div>
	<!-- /ko -->
	
	</div>
	
	<div class="row">
		<div class="col-lg-12 text-center">
			<h2 class="section-heading">Les Horaires</h2>
		</div>
	</div>
	
	<div class="row schedule">
		<table border="1" cellpadding="4" cellspacing="1">
			<tbody>
				
				<tr>
					<td colspan="3">
						Mardi
					</td>
				</tr>
				<tr>
					<td>Cours de Krav Maga
						
					</td>
					<td>20h15 à 21h45</td>
					<td>Jean-Christophe
						
					</td>
				</tr>
				<tr>
					<td colspan="3">
						Mercredi
					</td>
				</tr>
				<tr>
					<td> Groupe enfants Baby Karaté 4 à 5 ans </td>
					<td> 17H00 à 18H00</td>
					<td> Jean-Louis + Corentin
						
					</td>
				</tr>
				<tr>
					<td>Groupe enfants+ Ecole de Karaté 6-8 ans</td>
					<td>18H00 à 19H00</td>
					<td>Christine + Jean-Louis + Bruno
						
					</td>
				</tr>
				<tr>
					<td>Groupe enfants débutants 8 à 14 ans 
						+ 2ème année
					</td>
					<td>19H00 à 20H00</td>
					<td>Christine + Jean-Louis + Bruno
						
					</td>
				</tr>
				<tr>
					<td>Groupes enfants ceintures blanche-jaune à 
						à marron
					</td>
					<td>18h15 à 19H45</td>
					<td>Olivier + Ulysse + Anthony + Jacquy + Vivien
						
					</td>
				</tr>
				<tr>
					<td>Groupe adultes débutants</td>
					<td>20h15 à 21H45</td>
					<td>Christine + Antoine + Jacky
						
					</td>
				</tr>
				<tr>
					<td>Groupe adultes ceintures jaune à orange</td>
					<td>20h15 à 21H45</td>
					<td>Jacquy + Jean-Louis</td>
				</tr>
				<tr>
					<td>Groupe adultes ceintures verte à noire</td>
					<td>20h15 à 21H45</td>
					<td>Emmanuel</td>
				</tr>
				<tr>
					<td colspan="3"  >
						Jeudi
					</td>
				</tr>
				<tr>
					<td>Groupe Compétitions blanc-jaune 
						à marron
					</td>
					<td>18h15 à 20h15</td>
					<td>Jacquy + Jean-Louis
						
					</td>
				</tr>
				<tr>
					<td>Groupe Ceintures Noires et 1er Kyu</td>
					<td>20h00 à 21h30</td>
					<td>entrainement libre
						
					</td>
				</tr>
				<tr>
					<td>Préparation Ceinture Noire</td>
					<td></td>
					<td>Jacquy</td>
				</tr>
				<tr>
					<td colspan="3"  >
						Vendredi
					</td>
				</tr>
				<tr>
					<td> Groupe enfants + Ecole de Karaté 6-8 ans</td>
					<td>18h00 à 19H00</td>
					<td>Christine + Jean-Louis + Bruno
						
					</td>
				</tr>
				<tr>
					<td>Groupe enfants débutants 8 à 14 ans</td>
					<td>19H00 à 20H00</td>
					<td>Christine + Jean-Louis + Bruno
						
					</td>
				</tr>
				<tr>
					<td>Groupes enfants ceintures blanche-jaune à marron
						
					</td>
					<td>18H15 à 19H45</td>
					<td>Olivier + Jean-Christophe + Ulysse + Anthony + Jacquy + Vivien
						
					</td>
				</tr>
				<tr>
					<td>Groupe adultes débutants</td>
					<td>20H15 à 21H45</td>
					<td>Antoine</td>
				</tr>
				<tr>
					<td>Groupe adultes ceintures jaune à orange</td>
					<td>20H15 à 21H45</td>
					<td>Christine ou Antoine</td>
				</tr>
				<tr>
					<td>Groupe adultes ceintures verte à noire</td>
					<td>20H15 à 21H45</td>
					<td>Ulysse</td>
				</tr>
			</tbody>
		</table>
	
	</div>
	
</section>