class Section {
  progress = 0;
  rectTop = 0;
  
  constructor(item, height, imgWrapper) {
    this.item = item;
    this.height = height;
    this.imgWrapper = imgWrapper;
  }
  
  get progress() {
    return this.progress;
  }
  get rectTop() {
    return this.rectTop;
  }
  
  updateRectTop() {
    this.rectTop = this.item.getBoundingClientRect().top;
  }
  updateProgress() {
    this.progress = clientHeight - this.rectTop;
  }
}

var clientHeight = window.innerHeight;
const userflowSections = document.getElementsByClassName('userflow__section');

const sections = [];
for (let i = 0; i < userflowSections.length; i++) {
  const imgWrapper = userflowSections[i].querySelector('.img-wrapper');
  // const userflowImg = userflowSections[i].querySelector('.userflow__img');

  const sectionHeight = userflowSections[i].clientHeight;
    imgWrapper.style.transform = `translateY(${sectionHeight}px)`;
    sections.push(new Section(userflowSections[i], sectionHeight, imgWrapper));

  // userflowImg.onload = () => {
  //   console.log('lol');
  //   const sectionHeight = userflowSections[i].clientHeight;
  //   console.log(sectionHeight);
  //   imgWrapper.style.transform = `translateY(${sectionHeight}px)`;
  //   sections.push(new Section(userflowSections[i], sectionHeight, imgWrapper));
  // }
}

window.addEventListener('scroll', () => {
  sections.forEach((section) => {
    section.updateRectTop();
    if (section.rectTop <= clientHeight) {
      section.updateProgress();
      //const regExp = /\d+/;
      //console.log(section.progress);
      //const actualTranslateY = section.imgWrapper.style.transform.match(regExp)[0];
      const newTranslateY = (section.height - section.progress) / 2;
      // console.log({now: newTranslateY});
      section.imgWrapper.style.transform = `translateY(${newTranslateY}px)`;
    }
  });
});