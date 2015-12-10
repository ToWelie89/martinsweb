<div id="backLink"><span>X</span></div>
<div class="marginTop paddingTop">
	<div class="table center paddingTop">
		<div class="tableRow">
			<div class="tableRowCell projectsInfoFirstColumn"></div>
			<div class="tableRowCell projectsInfoSecondColumn">
				<h5>Bachelors thesis</h5>
			</div>
		</div>
		<div class="tableRow">
			<div class="tableRowCell projectsInfoFirstColumn">
				<img src="../../assets/build/exjobb.png" class="projectsInfoPicture">
			</div>
			<div class="tableRowCell projectsInfoSecondColumn">
				<p class="bodyText">
					This is my bachelors thesis I did at my time at Chalmers together with another student. The work was carried out at the company ESAB, a company 
					that develops robotic welding systems used in industrial settings. These systems were composed of a robotic welding arm, a voltage outage, 
					a controller unit etc. Their problems was that they lacked an efficient way to analyze the data traffic between components, something that 
					can be very crucial when searching for the source of various problems in the field.
					<br><br>
					These systems communicated via CAN nodes or via Ethernet, using different protocols. We ultimately ended up creating two different solutions, 
					one for each type of communication. For Ethernet we created a dissector, a plugin, for the popular open source software Wireshark, used for 
					sniffing network traffic. Our plugin could interpret packets between the components based on ESAB's memory model so that the user can 
					easily see exceptions and shifting flags. For CAN traffics we developed an application in C# that communicated via an Ixxat CAN-to-USB 
					adapter and could thus read data in realtime, print graphs etc.
					<br><br>
					For more information the entire report can be downloaded below.
				</p>
				<div class="paddingTop floatRight">
					<a class="button" href="documents/BachelorsThesisReport.pdf" target="_blank" download="BachelorsThesisReport.pdf">
						<p text="Report"></p>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>