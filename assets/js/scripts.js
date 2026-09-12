const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const portraitFrame = document.querySelector('.portrait-frame');

const updatePortraitReveal = (event) => {
  const image = portraitFrame?.querySelector('img');
  if (!image) return;
  const bounds = image.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;
  portraitFrame.style.setProperty('--mx', `${x}%`);
  portraitFrame.style.setProperty('--my', `${y}%`);
};

portraitFrame?.addEventListener('mousemove', updatePortraitReveal);
portraitFrame?.addEventListener('pointermove', updatePortraitReveal);

portraitFrame?.addEventListener('mouseenter', () => {
  portraitFrame.style.setProperty('--reveal-size', '96px');
});

portraitFrame?.addEventListener('pointerleave', () => {
  portraitFrame.style.setProperty('--reveal-size', '0px');
});

const cvSections = document.querySelectorAll('.cv-section-list');
const experienceList = cvSections[0];
const communityList = cvSections[2];

const startYear = (row) => Number(row.querySelector('span')?.textContent.match(/\d{4}/)?.[0] || 0);

if (experienceList) {
  const conferenceStaff = [...experienceList.children].find((row) => row.textContent.includes('Conference Staff'));
  if (conferenceStaff) conferenceStaff.querySelector('span').textContent = '2024';

  const apartResearch = [...experienceList.children].find((row) => row.textContent.includes('Research Assistant · Apart Research'));
  if (apartResearch) {
    apartResearch.querySelector('span').textContent = '2022—23';
    apartResearch.querySelector('strong').textContent = 'Research Assistant & Community Manager · Apart Research';
    apartResearch.querySelector('small').textContent = 'Supporting the community and contributing to its AI-safety research activities.';
  }

  [...experienceList.children].sort((a, b) => startYear(b) - startYear(a)).forEach((row) => experienceList.append(row));
}

if (communityList) {
  [...communityList.children].sort((a, b) => startYear(b) - startYear(a)).forEach((row) => communityList.append(row));
}
