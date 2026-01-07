// OG 이미지 생성 스크립트
const fs = require('fs');
const { createCanvas } = require('canvas');

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// 그라데이션 배경
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// 제목
ctx.fillStyle = 'white';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('오늘의 아재개그', width / 2, 200);

// 이모지 아이콘
ctx.font = '120px Arial';
ctx.fillText('😁', width / 2, 320);

// 부제목
ctx.font = '36px Arial';
ctx.fillText('매일 새로운 아재개그로 하루를 즐겁게!', width / 2, 420);

// 하단 브랜드
ctx.font = '24px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.fillText('joke.funnyfunny.cloud', width / 2, 580);

// PNG로 저장
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('og-image.png', buffer);
console.log('✅ og-image.png 생성 완료!');

