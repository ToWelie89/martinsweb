const setAllSubChildrenToReceiveShadow = children => {
    children.forEach(child => {
        child.receiveShadow = true;
        child.castShadow = true;
        child.near = 0.001;
        child.far = 3000;
        if (child.material) {
            child.material.receiveShadow = true;
        }

        if (child.children && child.children.length > 0) {
            setAllSubChildrenToReceiveShadow(child.children);
        }
    });
}

const MODELS = [{
    thumbnail: '/3dmodels/triplane/thumbnail.png',
    name: 'triplane',
    displayName: 'Triplane',
    description: 'This is a plane based on the old style "triplane" design commonly used in WW1. This model is actually based on an actual model, namely the <a href="https://ca.wikipedia.org/wiki/Sopwith_Triplane" target="_blank">Sopwith Triplane</a>. I based my 3D model on the blueprint of the original plane, in order to get the exact proportions. I doubt that the original plane was pink however. I also added a propeller animation and an animated pilot. I also integrated this model into my <a href="/#/3dmodels/start">start animation</a>.',
    tabs: [{
        name: '3D Preview',
        content: '/3dmodels/triplane/3dPreview.html',
        callback: () => {
            document.getElementById('triplaneLoading').style.display = 'none';
            window.initiate3dModel(
                './3dmodels/triplane/triplane.glb',
                'threeDModelPreview',
                true,
                { // camera config
                    rotation: {
                        x: -0.2925188891033147,
                        y: -0.7948019044484699,
                        z: -0.2117226252250864
                    },
                    position: {
                        x: -5.5524305571029,
                        y: 4.5992950409251945,
                        z: 5.0203755005862725
                    }
                },
                null,
                animations => { // Animations to play on loop
                    return animations.filter(x => x.name === 'Pilot' || x.name === 'Propeller')
                },
                null,
                {
                    enablePan: true,
                    enableRotate: true,
                    enableZoom: true,
                    maxDistance: 17,
                    minDistance: 3
                },
                0x006bb3
            );
        }
    }]
}, {
    thumbnail: '/3dmodels/orc/thumbnail.png',
    name: 'orc',
    displayName: 'Orc',
    description: 'This is my first somewhat successful attempt at sculpting in Blender. It\'s a simple orc head, inspired by orcs from Warhammer and Warcraft. I plan to continue this model some day and create the rest of the body as well.',
    tabs: [{
        name: 'Screenshots',
        content: '/3dmodels/orc/screenshots.html',
        callback: () => {
            $('.carousel-control.left').click(function() {
                $('.projectCarousel').carousel('prev');
            });
            $('.carousel-control.right').click(function() {
                $('.projectCarousel').carousel('next');
            });
    
            $('.carousel-indicators li').on('click', function() {
                $('.projectCarousel').carousel($(this).index());
            });
        }
    }, {
        name: 'Animation',
        content: '/3dmodels/orc/animation.html'
    }, {
        name: '3D Preview',
        content: '/3dmodels/orc/3dPreview.html',
        callback: () => {
            document.getElementById('orcLoading').style.display = 'none';
            window.initiate3dModel(
                './3dmodels/orc/orc.glb',
                'threeDModelPreview',
                true,
                { // camera config
                    rotation: {
                        x: -0.2029013172089961,
                        y: 0.33028185740198107,
                        z: 0.06662224847372154
                    },
                    position: {
                        x: 2.625152903217499,
                        y: 2.662201418567157,
                        z: 7.63151455321799
                    }
                },
                null,
                null,
                null,
                {
                    enablePan: false,
                    enableRotate: true,
                    enableZoom: true,
                    maxDistance: 13,
                    minDistance: 5
                }
            );
        }
    }]
}, {
    thumbnail: '/3dmodels/start/thumbnail.png',
    name: 'start',
    displayName: 'Start animation',
    description: 'This is the same 3D animation that I have on the start page of my portfolio. I made a simple landscape in Blender that I textured as well. I made the animations of the clouds moving and the text falling down from the sky. Then I proceeded to add more elements, such as the plane, the flying bird, the car driving the and the guy peaking outside of the windows in the castle. They are all separate actions, animated in Blender and saved into the file itself. Three.js then loads the file as a glb-file and programmatically starts playing the baked actions.',
    tabs: [{
        name: '3D Preview',
        content: '/3dmodels/start/3dPreview.html',
        callback: () => {
            document.getElementById('startLoading').style.display = 'none';
            window.initiate3dModel(
                './assets/sonesson_logo.glb',
                'threeDModelPreview',
                false,
                { // camera config
                    rotation: {
                        x: -0.20109952889104435,
                        y: -0.007656962676424146,
                        z: 0
                    },
                    position: {
                        x: -0.32500515103057936,
                        y: 7.95142682045288,
                        z: 26.22902112349524
                    }
            
                },
                children => {
                    setAllSubChildrenToReceiveShadow(children);
                    children.find(x => x.name === 'Backdrop').receiveShadow = false;
                },
                animations => { // Animations to play on loop
                    return animations.filter(
                        x =>
                            x.name === 'CLOUDACTION' ||
                            x.name === 'CarAction' ||
                            x.name === 'Action.001' ||
                            x.name === 'CenterAction' ||
                            x.name === 'Guy' ||
                            x.name === 'Propeller' ||
                            x.name === 'Pilot' ||
                            x.name.includes('PlanePath') ||
                            x.name.includes('TreeAction') ||
                            x.name.includes('Flag')
                    )
                },
                animations => { // Animations to play once
                    return animations.filter(x => x.name.includes('Text') && x.name.includes('Action'))
                }
            );
        }
    }]
}, {
    thumbnail: '/3dmodels/donut/thumbnail.png',
    name: 'donut',
    displayName: 'Donut',
    description: 'This is the first model I modelled and rendered in Blender. As many other Blender users my first 3D model is of a donut, since I followed a popular tutorial series by Blender Guru which is to create a donut and thus starting to learn Blender.',
    tabs: [{
        name: 'Animation',
        content: '/3dmodels/donut/video.html'
    }]
}];

export {MODELS};
