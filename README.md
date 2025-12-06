# 지금날씨 🌤️

실시간 날씨, 미세먼지, 초미세먼지, 체감온도, 자외선 정보를 한눈에 확인할 수 있는 웹 서비스입니다.

## 주요 기능

- ✅ 실시간 날씨 정보
- ✅ 위치 기반 자동 인식
- ✅ 미세먼지(PM10) 및 초미세먼지(PM2.5) 정보
- ✅ 체감온도 및 자외선 지수
- ✅ 모바일 최적화
- ✅ 공유 기능 (카카오톡, 인증샷 등)
- ✅ SEO 최적화
- ✅ GitHub Pages 배포 지원

## 설정 방법

### 1. API 설정

**Open-Meteo API 사용** - 완전 무료, 가입 불필요, API 키 불필요 ✅

이 프로젝트는 Open-Meteo API를 사용합니다:
- 실시간 날씨 정보
- 미세먼지 (PM10, PM2.5)
- 자외선 지수 (UV Index)
- 체감온도

별도의 API 키 설정이 필요 없습니다!

### 2. GitHub Pages 배포

1. GitHub 저장소 생성
2. 파일 업로드 또는 Git으로 Push
3. Settings → Pages에서 GitHub Pages 활성화
4. Source를 `main` 브랜치로 설정

### 3. OG 이미지 및 메타 태그 설정

`index.html` 파일에서 다음 URL을 실제 GitHub Pages URL로 변경하세요:

```html
<meta property="og:url" content="https://yourusername.github.io/weather/">
<meta property="og:image" content="https://yourusername.github.io/weather/og-image.png">
```

### 4. 파비콘 및 OG 이미지 생성

1. 브라우저에서 `create-favicon.html` 파일을 열고 "favicon.png 다운로드" 버튼 클릭
2. 브라우저에서 `create-og-image.html` 파일을 열고 "og-image.png 다운로드" 버튼 클릭
3. 다운로드된 이미지 파일들을 프로젝트 루트에 저장

또는 `favicon.svg` 파일이 이미 생성되어 있어 SVG 파비콘을 사용할 수 있습니다.

## 사용 방법

1. 브라우저에서 위치 권한 허용
2. 자동으로 현재 위치의 날씨 정보 표시
3. 새로고침 버튼으로 정보 업데이트
4. 공유 버튼으로 날씨 정보 공유

## 기술 스택

- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript
- Open-Meteo API (무료, API 키 불필요)

## 라이선스

© 2025 AshLight. All rights reserved.

## 문의

ashlight2510@gmail.com

