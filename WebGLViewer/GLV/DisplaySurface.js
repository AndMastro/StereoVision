// Class DisplaySurface: walls of a projection-based system

DisplaySurface = function(orig, uvector, vvector){ 
    this.origin = orig; // Vec3 - Origin of the display
    this.u = uvector;   // Vec3 - Horizontal vector
    this.v = vvector;   // Vec3 - Vertical vector
};

// Functions

DisplaySurface.prototype.viewingMatrix = function(eye){
	mat = new Mat4();
    mat.loadIdentity();
	
	// TBC: this example does NOT create the correct viewing matrix
	var eye = new Vec3(0.0, 50.0, 100.0);
	var vrp = new Vec3(0.0, 0.0, 0.0);
	var up = new Vec3(0.0, 1.0, 0.0);
	mat.lookAt(eye, vrp, up);
	
	return mat;
};

DisplaySurface.prototype.projectionMatrix = function(eye, znear, zfar){
	mat = new Mat4();
    mat.loadIdentity();
    
	// TBC: this example does NOT create the correct projection matrix
	mat.frustum(-5, 5, -5, 5, 10, 1000);
	
	return mat;
};
