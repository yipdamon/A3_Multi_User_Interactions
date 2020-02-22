'use strict'

AFRAME.registerComponent('dialogue-component', {
    schema: {},
    init: function() {
        const Context_AF = this; 

        Context_AF.el.addEventListener('click', function(event) {
            console.log("clicked!")
            Context_AF.speakToPlayer();
        });

    },

    speakToPlayer : function () {
        const Context_AF = this;

        //Create an html element/entity that creates text panel
        let textPanel = document.createElement('a-entity');     
        textPanel.setAttribute('id', 'textPanel');
        textPanel.setAttribute('geometry', 'primitive: plane; height: 0.7; width: 2.0');   
        textPanel.setAttribute('material', 'color: #FFFAFD');  
        textPanel.setAttribute('text', 'value:Its a draw!; font:roboto; width:1.25; anchor:left; color:black; baseline:top; wrapCount:30; xOffset:-0.46; zOffset:0.001');
        textPanel.setAttribute('dialogue-distance-component', {});


        //Set transformations for text panel
        var sceneEl = document.querySelector('a-scene');
        let currentNPC = sceneEl.querySelector('#NPC');
        textPanel.setAttribute('position', {x: currentNPC.object3D.position.x, y:2.0, z: currentNPC.object3D.position.z}); 

        //Attach text panel to scene
        let scene = document.querySelector('a-scene');
        scene.appendChild(textPanel);

    }
});