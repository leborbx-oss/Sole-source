## 2026-05-27 - 3D ASMR Shower Game Initialization

**Learning:** Users are looking for immersive, sensory-focused experiences (ASMR) combined with simple, satisfying interactions in a mobile-first format. 3D in the browser (via Three.js) provides a high level of engagement but requires careful optimization for mobile performance and accessibility.

**Action:** Implement a 3D showering game using React Three Fiber. Focus on "invisible" interactions (smooth dragging, responsive particles) and high-quality spatial audio to meet the ASMR requirement. Ensure all 3D controls have accessible alternatives or descriptive ARIA labels.

## 2026-05-27 - Optimization & Audio Cleanup

**Learning:** When building 3D experiences for mobile browsers, performance and resource management are critical. `InstancedMesh` is essential for handling many particles efficiently. Additionally, managing the lifecycle of the `AudioContext` is necessary to prevent audio leaks when the user navigates away from the page.

**Action:** Optimized the water particle system using `InstancedMesh` and added a `destroy` method to the `ASMRController` to handle component unmounting.
