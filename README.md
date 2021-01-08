# 3D Graphics Coursework 2020/2021 (902282)
Coursework done for the 3D Graphics Module 2020/2021

## Deliverables:
- **RAR** file named *"902282"* containing **Task 1** and **Task 2**
	- Copy of both Task 1 and 2 Source Code.
	- (*Task 1*) Small Report of no more than 1000 words.

## Rules:
- Don't use any WebGL library to draw primitives, etc.

## Todo List:
 ### Task 1:
- [ ] Animation of **planet earth** with a **satellite orbiting** and a **light scene** ***at 60 degrees***:
	- [ ] Earth Model
		- ✅ Main Model is a **Sphere of radius 10**
		- [ ] Earth Mapped with Earth Image
		- [ ] Rotating around it's **vertical** axis
	- [ ] Satellite Model
		- ✅ Main Body is a cube of size 2x2x2
			- ✅ One part of the body is black in colour
				- [ ] This side **will always face earth**
		- ✅ Two **solar panels** attached to each side of main body:
			- ✅ Connected with ***GOLDEN*** **Rods** to the body
				- ✅ Rods are **cuboids** of size **0.2x0.2x0.5**
			- ✅ Solar Panels are a ***blueish*** color
			- ✅ Consist of 1x2 **rectangular objects**
			- ✅ Always facing upwards (for simplicity)
		- ✅ A **golden antenna dish of diameter 4**
			- ✅ Attached to the black side of the main body by a **Golden Rod**
				- ✅ This Rod will have a size of **0.2x0.2x0.4**
			- [ ] The antenna will **always face** earth
		- [ ] Should orbit around the earth with on side always facing it.
	- [ ] Lighting
		- [ ] Light should be **Directional** and illuminated from **Top-right**
		- [ ] 60-degree **angle relative to the horizontal plane**, if viewed from the front
	- [ ] Animation
		- [ ] Should be controllable **during runtime**
			- [ ] Left/Right arrow keys control **Orbit Radius**
			- [ ] Up/Down arrow keys control **Orbit Speed**
			- [ ] Should have **controllable camera**
				- [ ] Shift+Mouse (**Translate along x-axis**) [Horizontal Pan]
				- [ ] Alt+Mouse (**Translate along y-axis**) [Vertical Pan]
				- [ ] Mouse Wheel (**Translate along z-axis**) [Zoom]
				- [ ] Mouse Drag (**X/Y Rotation**) [Rotation]
	- [ ] Misc
		- [ ] Should work on Firefox due to texture problems
		- [ ] Should work on **Uni PCs** *without* **additional setups**
		- [ ] Rigorous Testing
