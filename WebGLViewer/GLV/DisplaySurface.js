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

	// Define Up Vector for LookAt Function
	var up = new Vec3(0.0, 1.0, 0.0);
	
	// Compute Normal Vector of the Plane (DisplaySurface)
	var normal = Vec3.cross(this.u, this.v).normalize();

	// Project EYE Point to the Plane (DisplaySurface)
	// Source: https://math.stackexchange.com/questions/100761/how-do-i-find-the-projection-of-a-point-onto-a-plane
	var value_t = (Vec3.dot(normal, this.origin) - Vec3.dot(normal, eye)) / normal.norm();

	var target = Vec3.add(eye, normal.mult(value_t));
	
	// Create LookAt from Eye and Forward and Up Vectors
	mat.lookAt(eye, target, up);
	
	return mat;
};

DisplaySurface.prototype.projectionMatrix = function(eye, znear, zfar){
	mat = new Mat4();
    mat.loadIdentity();
		
	// Compute vectors from screen vertices to eye
	var v1 = Vec3.subtract(this.origin, eye);
	var vertex = Vec3.add(this.origin, this.u, this.v);
	var v2 = Vec3.subtract(vertex, eye);

	// Compute projection of vectors on the screen
	var pl = this.u.project(v1);
    var pr = this.u.project(v2);
    var pb = this.v.project(v1);
    var pt = this.v.project(v2);

	// Compute distance from eye to screen
	var normal = Vec3.cross(this.u, this.v).normalize();
	var screenDist = -1.0 * (Vec3.dot(normal, v2));

	// Compute left, right, top, bottom
	var left = Math.sign(Vec3.dot(pl, this.u)) * pl.norm() * znear / screenDist;
    var right = Math.sign(Vec3.dot(pr, this.u)) * pr.norm() * znear / screenDist;
    var bottom = Math.sign(Vec3.dot(pb, this.v)) * pb.norm() * znear / screenDist;
    var top = Math.sign(Vec3.dot(pt, this.v)) * pt.norm() * znear / screenDist;
	
	mat.frustum(left, right, bottom, top, znear, zfar);
	
	return mat;
};
