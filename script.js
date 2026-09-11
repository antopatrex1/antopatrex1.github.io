'use strict';
(() => {
  const shoulder = document.getElementById('shoulder');
  const elbow = document.getElementById('elbow');
  const radians = degrees => degrees * Math.PI / 180;
  const L1 = 1.3;
  const L2 = 1.1;
  const scale = 69.5;
  function updateArm() {
    const q1 = radians(Number(shoulder.value));
    const q2 = radians(Number(elbow.value));
    const x1 = L1 * Math.cos(q1), y1 = L1 * Math.sin(q1);
    const x = x1 + L2 * Math.cos(q1 + q2), y = y1 + L2 * Math.sin(q1 + q2);
    const joint = [250 + scale * x1, 200 - scale * y1];
    const end = [250 + scale * x, 200 - scale * y];
    document.getElementById('arm-link-one').setAttribute('d', `M250 200L${joint[0]} ${joint[1]}`);
    document.getElementById('arm-link-two').setAttribute('d', `M${joint[0]} ${joint[1]}L${end[0]} ${end[1]}`);
    [['elbow-joint', joint], ['end-joint', end]].forEach(([id, p]) => {
      document.getElementById(id).setAttribute('cx', p[0]);
      document.getElementById(id).setAttribute('cy', p[1]);
    });
    document.getElementById('projection').setAttribute('d', `M250 200L${end[0]} 200L${end[0]} ${end[1]}`);
    const label = document.getElementById('end-label');
    label.setAttribute('x', Math.max(20, Math.min(420, end[0] + 12)));
    label.setAttribute('y', Math.max(23, end[1] - 13));
    document.getElementById('shoulder-value').value = `${shoulder.value}°`;
    document.getElementById('elbow-value').value = `${elbow.value}°`;
    document.getElementById('coordinates').value = `x ${x.toFixed(2)} · y ${y.toFixed(2)}`;
    document.getElementById('arm-desc').textContent = `Two-link arm at shoulder ${shoulder.value} degrees and elbow ${elbow.value} degrees. Endpoint x ${x.toFixed(2)}, y ${y.toFixed(2)} units.`;
  }
  shoulder.addEventListener('input', updateArm);
  elbow.addEventListener('input', updateArm);
  document.getElementById('reset-arm').addEventListener('click', () => {
    shoulder.value = 35; elbow.value = 55; updateArm();
  });
  updateArm();
})();
