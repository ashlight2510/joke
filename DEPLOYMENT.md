# 배포 가이드

## GitHub Pages 배포 방법

### 1단계: 저장소 생성 및 업로드

```bash
git init
git add .
git commit -m "Initial commit: 지금날씨 서비스"
git branch -M main
git remote add origin https://github.com/yourusername/weather.git
git push -u origin main
```

### 2단계: GitHub Pages 활성화

1. GitHub 저장소로 이동
2. Settings → Pages
3. Source를 `Deploy from a branch` 선택
4. Branch를 `main` / `/ (root)` 선택
5. Save 클릭

### 3단계: API 설정

**Open-Meteo API 사용** - API 키 설정 불필요! ✅

이 프로젝트는 Open-Meteo API를 사용하므로 별도의 API 키 설정이 필요 없습니다.
- 완전 무료
- 가입 불필요
- 사용 제한 없음
- 실시간 날씨, 미세먼지, 자외선 정보 제공

### 4단계: 메타 태그 URL 수정

`index.html` 파일에서 다음 URL을 실제 GitHub Pages URL로 변경:

```html
<!-- 현재 -->
<meta property="og:url" content="https://yourusername.github.io/weather/">
<meta property="og:image" content="https://yourusername.github.io/weather/og-image.png">

<!-- 변경 예시 -->
<meta property="og:url" content="https://ashlight.github.io/weather/">
<meta property="og:image" content="https://ashlight.github.io/weather/og-image.png">
```

### 5단계: 이미지 파일 생성

1. 브라우저에서 `create-favicon.html` 열기
2. "favicon.png 다운로드" 버튼 클릭
3. 다운로드된 파일을 프로젝트 루트에 저장
4. 브라우저에서 `create-og-image.html` 열기
5. "og-image.png 다운로드" 버튼 클릭
6. 다운로드된 파일을 프로젝트 루트에 저장

### 6단계: 배포 확인

1. GitHub Pages URL로 접속 (예: `https://yourusername.github.io/weather/`)
2. 위치 권한 허용
3. 날씨 정보가 정상적으로 표시되는지 확인

## 문제 해결

### 위치 정보 오류
- 브라우저 위치 권한 확인
- HTTPS 환경에서만 작동 (GitHub Pages는 자동 HTTPS)

### 이미지가 표시되지 않음
- 파일 경로 확인
- GitHub에 이미지 파일이 업로드되었는지 확인

