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
	var up = new Vec3(0.0, 1.0, 0.0);
	
	var normal = Vec3.cross(this.u, this.v).normalize();

	var value_t = (normal.x * this.origin.x - normal.x * eye.x + normal.y * this.origin.y - normal.y * eye.y + normal.z * this.origin.z - normal.z * eye.z) / (normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);

	var vrp = new Vec3(eye.x + value_t * normal.x, eye.y + value_t * normal.y, eye.z + value_t * normal.z);

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
