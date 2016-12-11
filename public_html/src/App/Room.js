/*
 * File: Bed.js 
 * A bed object.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Room(shader, name, xPos, yPos, width, height) {
    SceneNode.call(this, shader, name, true);
    
    var xf = this.getXform();
    xf.setPosition(xPos, yPos);
    //xf.setPivot(xPivot, yPivot);

    // floor
    this.floor = new SceneNode(shader, "Floor", false, 0,0);
    this.addAsChild(this.floor);

    // ceiling
    this.ceiling = new SceneNode(shader, "Ceiling", false, 0,0);
    this.addAsChild(this.ceiling);

    // floor pattern
    this.floorPattern = new SquareRenderable(shader);
    // this.floorPattern.setColor([0.3, 0.3, 0.3, 1]);
    this.setFloorPattern(new Texture('assets/floor2.jpg'));
    this.setFloorPatternScale(3,3);
    this.setSize(width, height);
    this.addToSet(this.floorPattern);
}
gEngine.Core.inheritPrototype(Room, SceneNode);

Room.prototype.addFurniture = function(item) {
    // TODO: expand logic to any ceiling item via flag
    if (item.getName() == 'Ceiling Fan')
        this.ceiling.addAsChild(item);
    else this.floor.addAsChild(item);
};

Room.prototype.removeFurniture = function(item) {
    this.floor.removeChild(item);
    this.ceiling.removeChild(item);
};

Room.prototype.setFloorPattern = function (texture) {
    this.floorPattern.setTexture(texture);
};

Room.prototype.setFloorPatternScale = function (scale) {
    this.floorPattern.getTexXform().setSize(scale,scale);
};

Room.prototype.setSize = function(width, height) {
    this.floorPattern.getXform().setSize(width, height);
    // TODO: move furniture within bounds
};

Room.prototype.draw = function (camera, drawCeiling) {
    camera.setupViewProjection();
    
    this.floorPattern.draw(camera, this.getXform().getXform());
    this.floor.draw(camera, this.getXform().getXform());
    if (drawCeiling) this.ceiling.draw(camera, this.getXform().getXform());
};

