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
	
	/*var normal = Vec3.cross(this.u, this.v).normalize();
    
    // The vector from the eye to the left bottom corner (the origin)
    var vecBotLeft = Vec3.subtract(this.origin, eye);
    // The vector from the eye to the right upper corner
    var vecTopRight = Vec3.subtract(Vec3.add(this.origin, this.u, this.v), eye);
    
    // The projection of the previous vectors over u and v
    var vLeftOnSurface = this.u.project(vecBotLeft);
    var vRightOnSurface = this.u.project(vecTopRight);
    var vBotOnSurface = this.v.project(vecBotLeft);
    var vTopOnSurface = this.v.project(vecTopRight);
    
    // The distance from the eye to the DisplaySurface
    var distToSurface = -(Vec3.dot(normal, vecBotLeft));
    
    // Apply triangle similarity to find the frustum values
    var left, right, bottom, top;
    if (Vec3.dot(vLeftOnSurface, this.u) > 0) left = vLeftOnSurface.norm()*znear/distToSurface;
    else left = -vLeftOnSurface.norm()*znear/distToSurface;
    if (Vec3.dot(vRightOnSurface, this.u) > 0) right = vRightOnSurface.norm()*znear/distToSurface;
    else right = -vRightOnSurface.norm()*znear/distToSurface;
    if (Vec3.dot(vBotOnSurface, this.v) > 0) bottom = vBotOnSurface.norm()*znear/distToSurface;
    else bottom = -vBotOnSurface.norm()*znear/distToSurface;
    if (Vec3.dot(vTopOnSurface, this.v) > 0) top = vTopOnSurface.norm()*znear/distToSurface;
    else top = -vTopOnSurface.norm()*znear/distToSurface;
    
    mat.frustum(left, right, bottom, top, znear, zfar);*/

	//compute 3 of points of the screen
	//var p1 = new Vec3(this.origin.x - this.u.x, this.origin.y - this.u.y, this.origin.z);
	/* var p1 = origin;
	var p2 = new Vec3(this.origin.x + this.u.x, this.origin.y, this.origin.z);
	var p3 = new Vec3(this.origin.x, this.origin.y + this.u.y, this.origin.z);
	

	//compute vectors from eye to screen vertices
	var v1 = Vec3.subtract(p1,eye);
	var v2 = Vec3.subtract(p2,eye);
	var v3 = Vec3.subtract(p3,eye);
	//var v1 = new Vec3(p1.x - eye.x, p1.y - eye.y, p1.z - eye.z);
	//var v2 = new Vec3(p2.x - eye.x, p2.y - eye.y, p2.z - eye.z);
	//var v3 = new Vec3(p3.x - eye.x, p3.y - eye.y, p3.z - eye.z);
	
	
	
	
	//compute screen axis
	var normal = Vec3.cross(this.u, this.v).normalize();
	//var vecRight = new Vec3(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z).normalize();
	//var vecUp = new Vec3(p3.x - p2.x, p3.y - p2.y, p3.z - p2.z).normalize();
	//var vecRight = Vec3.subtract(p2,p1).normalize();
	//var vecUp = Vec3.subtract(p3,p1).normalize();
	var vecRight = this.u.normalize();
	var vecUp = this.v.normalize();

	//compute distance from eye to screen
	var screenDist = -(Vec3.dot(normal, v1));

	//compute left, right, top, bottom
	var left = Vec3.dot(vecRight, v1)*znear/screenDist;
	var right = Vec3.dot(vecRight, v2)*znear/screenDist;
	var bottom = Vec3.dot(vecUp, v1)*znear/screenDist;
	var top = Vec3.dot(vecUp, v3)*znear/screenDist;
	
	mat.frustum(left, right, bottom, top, znear, zfar);
	//mat.frustum(-5, 5, -5, 5, 10, 1000);
*/		
	var left, right, bottom, top;


	//compute vectors from screen vertices to eye
	var v1 = Vec3.subtract(this.origin, eye);
	var vertex = Vec3.add(this.origin, this.u, this.v);
	var v2 = Vec3.subtract(vertex, eye);

	//compute projection of vectors on the screen
	var pl = this.u.project(v1);
    var pr = this.u.project(v2);
    var pb = this.v.project(v1);
    var pt = this.v.project(v2);

	//compute distance from eye to screen
	var normal = Vec3.cross(this.u, this.v).normalize();
	var screenDist = -(Vec3.dot(normal, v2));

	//compute left, right, top, bottom
	if (Vec3.dot(pl, this.u) > 0) left = pl.norm()*znear/screenDist;
    else left = -pl.norm()*znear/screenDist;
    if (Vec3.dot(pr, this.u) > 0) right = pr.norm()*znear/screenDist;
    else right = -pr.norm()*znear/screenDist;
    if (Vec3.dot(pb, this.v) > 0) bottom = pb.norm()*znear/screenDist;
    else bottom = -pb.norm()*znear/screenDist;
    if (Vec3.dot(pt, this.v) > 0) top = pt.norm()*znear/screenDist;
	else top = -pt.norm()*znear/screenDist;
	
	mat.frustum(left, right, bottom, top, znear, zfar);
	//mat.frustum(-5, 5, -5, 5, 10, 1000);
	return mat;
};
