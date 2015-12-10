<div id="backLink"><span>X</span></div>
<div class="marginTop paddingTop">
	<div class="table center paddingTop">
		<div class="tableRow">
			<div class="tableRowCell projectsInfoFirstColumn"></div>
			<div class="tableRowCell projectsInfoSecondColumn">
				<h5>Mobile Keyring</h5>
			</div>
		</div>
		<div class="tableRow">
			<div class="tableRowCell projectsInfoFirstColumn">
				<img src="../../assets/build/mkp.png" class="projectsInfoPicture">
			</div>
			<div class="tableRowCell projectsInfoSecondColumn">
				<p class="bodyText">
					Mobile Keyring was a project I worked on together with four other students during my time at Chalmers. The project revolved around developing 
					a good way to allow people to log into websites without having to enter ones real password. A secure form of login that could be used 
					in insecure settings, for instance if you are using a public computer and are worried about the existance of keyloggers.
					<br><br>
					The solution consisted of an Android application that the user uses to generate temporary passwords for a given website. The passwords can 
					be a one time use password with a specific time limit but it could also have a defined number of usages and/or any given time limit. In 
					order to use the app together with a specific website the website obviously has to support the functionality, something that can be fixed quite 
					easily by an admin on the server side. We used prototype websites with normal login functionality to test the technology out. 
					First time it is used with a specific website it has to be connected with the application using an authentication key that can 
					be inputted via a QR code. After the connection is made the app can thereafter be used to generate temporary keys for login without having 
					any stored information regarding the real password of the user.
					<br><br>
					The application also needed a pin code to unlock in case the cellphone would get stolen. As an extra precaution though we also developed a PC 
					application in Java that could be synced with the web application. The PC application could then in turn disable usage of the app to 
					generate passwords for given websites.
				</p>
				<div class="paddingTop floatRight">
					<a class="button" href="documents/MobileKeyringReport.pdf" target="_blank" download="MobileKeyringReport.pdf">
						<p text="Report"></p>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>