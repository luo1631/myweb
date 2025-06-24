// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    document.body.classList.add('fade-in');

    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 示例项目数据
    const projects = [
        {
            title: '响应式网站设计',
            description: '使用现代技术栈开发的响应式企业网站，包含动画效果和交互功能。',
            image: 'images/project1.jpg',
            tags: ['HTML5', 'CSS3', 'JavaScript']
        },
        {
            title: '移动应用界面',
            description: '为健康追踪应用设计的用户界面，注重用户体验和视觉美感。',
            image: 'images/project2.jpg',
            tags: ['UI/UX', 'Figma', '移动设计']
        },
        {
            title: '数据可视化项目',
            description: '使用 D3.js 开发的数据可视化项目，展示复杂数据的交互式图表。',
            image: 'images/project3.jpg',
            tags: ['D3.js', '数据可视化', 'JavaScript']
        },
        {
            title: '电子商务平台',
            description: '全栈电子商务解决方案，包含用户认证、支付集成和库存管理。',
            image: 'images/project4.jpg',
            tags: ['React', 'Node.js', 'MongoDB']
        }
    ];

    // 动态加载项目
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectGrid.appendChild(projectCard);
        });
    }

    // 创建项目卡片
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        
        const tagsHTML = project.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                    ${tagsHTML}
                </div>
            </div>
        `;

        // 添加点击事件
        card.addEventListener('click', () => {
            showProjectDetails(project);
        });

        return card;
    }

    // 显示项目详情
    function showProjectDetails(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal fade-in';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${project.image}" alt="${project.title}">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭模态框
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => {
            modal.remove();
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };
    }

    // 添加联系信息复制功能
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        const infoValues = contactInfo.querySelectorAll('.info-value');
        infoValues.forEach(value => {
            value.style.cursor = 'pointer';
            value.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(value.textContent);
                    showSuccessMessage('已复制到剪贴板！');
                } catch (err) {
                    console.error('复制失败:', err);
                }
            });
        });
    }

    // 显示成功消息
    function showSuccessMessage(message = '操作成功！') {
        const messageElement = document.createElement('div');
        messageElement.className = 'success-message fade-in';
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.remove();
        }, 2000);
    }

    // 导航栏滚动效果
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // 向下滚动
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // 向上滚动
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // 主题切换功能
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // 切换主题
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 语言切换功能
    const translations = {
        zh: {
            home: '首页',
            about: '关于',
            personal: '个人简介',
            projects: '项目',
            contact: '联系',
            heroTitle: '学习与开发',
            viewProjects: '查看作品',
            aboutMe: '关于我',
            aboutText: '我是一名充满热情的设计师和开发者，专注于创造优秀的用户体验和精美的界面设计。通过结合设计思维和技术实现，我致力于打造既美观又实用的数字产品。',
            skills: '技能专长',
            personalInfo: '个人简介',
            name: '姓名',
            age: '年龄',
            location: '所在地',
            jobIntention: '求职意向',
            education: '教育背景',
            contactMe: '联系我',
            phone: '电话',
            email: '邮箱',
            copyright: '个人作品集. All rights reserved.'
        },
        en: {
            home: 'Home',
            about: 'About',
            personal: 'Profile',
            projects: 'Projects',
            contact: 'Contact',
            heroTitle: 'Learning & Development',
            viewProjects: 'View Projects',
            aboutMe: 'About Me',
            aboutText: 'I am a passionate designer and developer, focused on creating excellent user experiences and beautiful interface designs. By combining design thinking and technical implementation, I am dedicated to building both aesthetically pleasing and practical digital products.',
            skills: 'Skills',
            personalInfo: 'Personal Info',
            name: 'Name',
            age: 'Age',
            location: 'Location',
            jobIntention: 'Job Intention',
            education: 'Education',
            contactMe: 'Contact Me',
            phone: 'Phone',
            email: 'Email',
            copyright: 'Portfolio. All rights reserved.'
        }
    };

    const languageToggleBtn = document.getElementById('language-toggle-btn');
    const langText = languageToggleBtn.querySelector('.lang-text');
    
    // 检查本地存储中的语言设置
    const savedLang = localStorage.getItem('language') || 'zh';
    updateLanguage(savedLang);

    // 切换语言
    languageToggleBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('data-lang');
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        
        updateLanguage(newLang);
        localStorage.setItem('language', newLang);
    });

    // 更新页面语言
    function updateLanguage(lang) {
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
        langText.textContent = lang === 'zh' ? 'EN' : '中';
        
        // 更新导航菜单
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks[0].textContent = translations[lang].home;
        navLinks[1].textContent = translations[lang].about;
        navLinks[2].textContent = translations[lang].personal;
        navLinks[3].textContent = translations[lang].projects;
        navLinks[4].textContent = translations[lang].contact;
        
        // 更新其他文本内容
        document.querySelector('.begin-content h1').textContent = translations[lang].heroTitle;
        document.querySelector('.cta-button').textContent = translations[lang].viewProjects;
        document.querySelector('#about h2').textContent = translations[lang].aboutMe;
        document.querySelector('.about-text p').textContent = translations[lang].aboutText;
        document.querySelector('.skills h3').textContent = translations[lang].skills;
        document.querySelector('#personal h2').textContent = translations[lang].personalInfo;
        document.querySelector('#projects h2').textContent = translations[lang].projects;
        document.querySelector('#contact h2').textContent = translations[lang].contactMe;
        
        // 更新个人信息标签
        const personalInfoLabels = document.querySelectorAll('.personal-info .info-label');
        personalInfoLabels[0].textContent = translations[lang].name + '：';
        personalInfoLabels[1].textContent = translations[lang].age + '：';
        personalInfoLabels[2].textContent = translations[lang].location + '：';
        personalInfoLabels[3].textContent = translations[lang].jobIntention + '：';
        
        // 更新教育背景
        document.querySelector('.education-timeline h3').textContent = translations[lang].education;
        
        // 更新联系信息标签
        const contactInfoLabels = document.querySelectorAll('.contact-info .info-label');
        contactInfoLabels[0].textContent = translations[lang].phone + '：';
        contactInfoLabels[1].textContent = translations[lang].email + '：';
        
        // 更新页脚版权信息
        document.querySelector('.footer-content p').textContent = translations[lang].copyright;
    }
}); 