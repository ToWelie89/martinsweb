<div class="mainPadding">
    <div id="socialMediaIconsContainer">
        <span id="previewTitle"></span>
        <div id="linksInnerContainer">
            <a href="http://se.linkedin.com/pub/martin-sonesson/47/b65/200" target="_blank"><i class="fab fa-linkedin fa-3x"></i></a>
            <a href="http://www.github.com/ToWelie89" target="_blank"><i class="fab fa-github fa-3x"></i></a>
            <a href="https://twitter.com/Martin_Sonesson" target="_blank"><i class="fab fa-twitter fa-3x"></i></a>
            <a href="http://stackoverflow.com/users/1408603/martingo89" target="_blank"><i class="fab fa-stack-overflow fa-3x"></i></a>
            <a href="http://www.instagram.com/martin.sonesson" target="_blank"><i class="fab fa-instagram fa-3x"></i></a>
            <a href="http://towelie89.deviantart.com/" target="_blank"><i class="fab fa-deviantart fa-3x"></i></a>
            <a href="https://www.twitch.tv/towelie89/profile/highlights" target="_blank"><i class="fab fa-twitch fa-3x"></i></a>
        </div>
    </div>
    <div class="mainContentItem marginTopLarge" id="bioContent" style="width: 100%;">
        <div style="float: left; width: 100%; text-align: center;">
            <div class="table center">
                <div class="tableRow">

                    <span class="tableRowCell center" id="avatarCell">
                       <div class="profileAvatar">
                       </div>
                    </span>

                    <span class="tableRowCell" id="informationCell">
                         <div class="table center" style="background-color: transparent;">
                             <div class="tableRow">
                                 <span class="tableRowCell">
                                     <p class="rowKeySpan" style="text-align: left;">
                                         Age
                                     </p>
                                 </span>
                                 <span class="tableRowCell">
                                     <p class="rowValueSpan">
                                         <?php
                                             $birthdate = new DateTime("1989-09-06");
                                             $today     = new DateTime();
                                             $interval  = $today->diff($birthdate);
                                             $age       = $interval->format('%y');
                                             echo $age;
                                         ?>
                                     </p>
                                 </span>
                             </div>
                             <div class="tableRow">
                                  <span class="tableRowCell">
                                     <p class="rowKeySpan" style="text-align: left;">
                                         Location
                                     </p>
                                  </span>
                                  <span class="tableRowCell">
                                     <p class="rowValueSpan">
                                         <a href="https://www.google.se/maps/place/G%C3%B6teborg/@57.7019548,11.8936825,11z/" target="_blank">
                                             Gothenburg, Sweden
                                         </a>
                                     </p>
                                  </span>
                             </div>
                             <div class="tableRow">
                                  <span class="tableRowCell">
                                     <p class="rowKeySpan" style="text-align: left;">
                                         Current employment
                                     </p>
                                  </span>
                                  <span class="tableRowCell">
                                     <p class="rowValueSpan">
                                         IT-consultant, <a href="http://annevo.com/" target="_blank">Annevo AB</a>
                                     </p>
                                  </span>
                             </div>
                        </div>

                    </span>
                </div>
           </div>
           <div class="mainContentItem" style="text-align: center; padding: 20px 40px 20px 40px;">
               <p class="textBody">
                    My name is Martin Sonesson and I'm a <?php echo $age; ?> year old software developer from Gothenburg. I have always been interested in
                    computers, IT and software and I have been creating websites since the glorious days of Geocities and web 2.0. In 2009
                    I started studying software engineering at Chalmers University of Technology. Three years later, in 2012, I did my
                    bachelors thesis at ESAB. The thesis consisted of developing a tool for analyzing data traffic between
                    components in an industrial welding system. More information about my bachelors thesis can be found under the <a href="/#projects">projects section</a>.
                    After three exciting and fun years at Chalmers I started my first job as a programmer at Cochlear Ltd where I
                    helped develop a windows application used for calibrating hearing devices. I worked at Cochlear for a year and during
                    that time I developed and learned a lot. Shortly after that I began working at Knowit, where I'm currently employed
                    as an IT-consultant.
                    <br>
                    <br>
                    Via Knowit I have worked for three years on a constulancy assignment at Telia where I began as a purely frontend developer but have
                    now transitioned into becoming more of a full stack developer. During these three years I have developed a lot as a person
                    and as a programmer. I've had the privilege of working with a lot of skilled colleagues in a big organization that requires
                    good communication and collaboration skills. Also, on the frontend side specifically, I am currently working with very modern
                    web technologies in an everchanging tech stack that requires keeping up with the fast evolution of the web.
                    <br>
                    <br>
                    I enjoy working on my own projects on my spare time, whereas this very website is one of those. Under the <a href="/#projects">projects section</a>
                    you can view some of my additional work with detailed explanations. You may also checkout my <a href="http://www.github.com/ToWelie89" target="_blank">Github profile</a>.
                    <br>
                    <br>
                    I am a passionate and friendly person. I am keen to learn new things and enjoy new challenges. I consider myself a
                    creative person who enjoy creating things from scratch and understanding how they work. Challenging tasks that require
                    me to come up with my own solutions in order to overcome a specific problem stimulates me significantly. Lately I've
                    been more and more into webdevelopment in particular due to my newest employment and within that field I strive to become
                    a full-stack developer, since I very much enjoy being able to do everything from wireframes and design to backend logic
                    and database handling.
                    <br>
                    <br>
                    In my spare time I enjoy <a href="/#art">drawing</a>, gaming, movies, travelling, running and working out. I like to keep myself busy and try out new
                    things.
               </p>
           </div>
        </div>
    </div>
</div>
