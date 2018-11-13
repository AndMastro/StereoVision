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
	var value_t = (normal.x * this.origin.x - normal.x * eye.x + normal.y * this.origin.y - normal.y * eye.y + normal.z * this.origin.z - normal.z * eye.z) / (normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);

	var vrp = new Vec3(eye.x + value_t * normal.x, eye.y + value_t * normal.y, eye.z + value_t * normal.z);
 
	// Create LookAt from Eye and Forward and Up Vectors
	mat.lookAt(eye, vrp, up);
	
	return mat;
};

DisplaySurface.prototype.projectionMatrix = function(eye, znear, zfar){
	mat = new Mat4();
    mat.loadIdentity();
		
	var left, right, bottom, top;

	// CSompute vectors from screen vertices to eye
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
	var screenDist = -(Vec3.dot(normal, v2));

	// Compute left, right, top, bottom
	if (Vec3.dot(pl, this.u) > 0) left = pl.norm()*znear/screenDist;
    else left = -pl.norm()*znear/screenDist;
    if (Vec3.dot(pr, this.u) > 0) right = pr.norm()*znear/screenDist;
    else right = -pr.norm()*znear/screenDist;
    if (Vec3.dot(pb, this.v) > 0) bottom = pb.norm()*znear/screenDist;
    else bottom = -pb.norm()*znear/screenDist;
    if (Vec3.dot(pt, this.v) > 0) top = pt.norm()*znear/screenDist;
	else top = -pt.norm()*znear/screenDist;
	
	mat.frustum(left, right, bottom, top, znear, zfar);
	
	return mat;
};
