// 파비콘 생성 스크립트
const fs = require('fs');
const { createCanvas } = require('canvas');

const size = 64;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// 그라데이션 배경
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, size, size);

// 둥근 모서리
ctx.beginPath();
ctx.roundRect(0, 0, size, size, 12);
ctx.clip();

// 텍스트 (웃는 이모지)
ctx.fillStyle = 'white';
ctx.font = 'bold 40px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('😁', size / 2, size / 2);

// PNG로 저장
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('favicon.png', buffer);
console.log('✅ favicon.png 생성 완료!');

