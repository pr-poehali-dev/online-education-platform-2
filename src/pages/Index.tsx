import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";

const COURSES = [
  {
    id: 1,
    title: "Основы UX-дизайна",
    instructor: "Анна Соколова",
    progress: 68,
    totalLessons: 24,
    completedLessons: 16,
    category: "Дизайн",
    duration: "8 ч 30 мин",
    cover: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=240&fit=crop",
    lessons: [
      { id: 1, title: "Введение в UX. Что это такое?", duration: "12:30", completed: true },
      { id: 2, title: "Исследование пользователей", duration: "18:45", completed: true },
      { id: 3, title: "Карты пользовательских путей", duration: "21:10", completed: true },
      { id: 4, title: "Прототипирование интерфейсов", duration: "25:00", completed: false },
      { id: 5, title: "Тестирование юзабилити", duration: "19:20", completed: false },
    ],
  },
  {
    id: 2,
    title: "Python для анализа данных",
    instructor: "Максим Петров",
    progress: 32,
    totalLessons: 36,
    completedLessons: 12,
    category: "Программирование",
    duration: "14 ч 20 мин",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=240&fit=crop",
    lessons: [
      { id: 1, title: "Установка Python и окружения", duration: "10:00", completed: true },
      { id: 2, title: "Основы синтаксиса Python", duration: "22:15", completed: true },
      { id: 3, title: "Работа с библиотекой Pandas", duration: "28:40", completed: false },
      { id: 4, title: "Визуализация данных с Matplotlib", duration: "24:00", completed: false },
    ],
  },
  {
    id: 3,
    title: "Маркетинг в социальных сетях",
    instructor: "Елена Волкова",
    progress: 85,
    totalLessons: 20,
    completedLessons: 17,
    category: "Маркетинг",
    duration: "6 ч 10 мин",
    cover: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=240&fit=crop",
    lessons: [
      { id: 1, title: "Стратегия контент-маркетинга", duration: "15:30", completed: true },
      { id: 2, title: "Работа с Instagram и VK", duration: "20:00", completed: true },
      { id: 3, title: "Таргетированная реклама", duration: "18:45", completed: false },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Дизайн": "bg-blue-50 text-blue-700",
  "Программирование": "bg-emerald-50 text-emerald-700",
  "Маркетинг": "bg-orange-50 text-orange-700",
};

type View = "dashboard" | "player";

export default function Index() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [activeCourse, setActiveCourse] = useState(COURSES[0]);
  const [activeLesson, setActiveLesson] = useState(COURSES[0].lessons[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(34);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const openLesson = (course: typeof COURSES[0], lesson: typeof COURSES[0]["lessons"][0]) => {
    setActiveCourse(course);
    setActiveLesson(lesson);
    setIsPlaying(false);
    setVideoProgress(lesson.completed ? 100 : 0);
    setActiveView("player");
  };

  const totalProgress = Math.round(
    COURSES.reduce((sum, c) => sum + c.progress, 0) / COURSES.length
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background text-sm font-bold">L</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">Learnify</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveView("dashboard")}
              className={`text-sm transition-colors ${activeView === "dashboard" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Мои курсы
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Каталог
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Достижения
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
            </button>
            <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center cursor-pointer">
              <span className="text-background text-xs font-semibold">АИ</span>
            </div>
          </div>
        </div>
      </header>

      {activeView === "dashboard" && (
        <main className="max-w-6xl mx-auto px-6 py-10">
          {/* Welcome */}
          <div className="mb-10 animate-fade-in">
            <p className="text-muted-foreground text-sm mb-1">Добро пожаловать</p>
            <h1 className="font-display text-5xl font-semibold text-foreground leading-tight">
              Алексей Иванов
            </h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Курсов в процессе", value: "3", icon: "BookOpen" },
              { label: "Уроков завершено", value: "45", icon: "CheckCircle" },
              { label: "Часов обучения", value: "28,5", icon: "Clock" },
              { label: "Общий прогресс", value: `${totalProgress}%`, icon: "TrendingUp" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-white border border-border rounded-2xl p-5 animate-fade-in delay-${(i + 1) * 100}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon name={stat.icon} size={18} className="text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Courses */}
          <div className="mb-6 flex items-center justify-between animate-fade-in delay-200">
            <h2 className="text-xl font-semibold text-foreground">Мои курсы</h2>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              Все курсы <Icon name="ChevronRight" size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {COURSES.map((course, i) => (
              <div
                key={course.id}
                className={`bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group animate-fade-in delay-${(i + 2) * 100}`}
                onClick={() => openLesson(course, course.lessons.find(l => !l.completed) || course.lessons[0])}
              >
                <div className="relative overflow-hidden h-40">
                  <img
                    src={course.cover}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/10" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[course.category]}`}>
                      {course.category}
                    </span>
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Icon name="Play" size={18} className="text-foreground ml-0.5" />
                    </div>
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1 leading-snug">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>{course.completedLessons} из {course.totalLessons} уроков</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {activeView === "player" && (
        <main className="max-w-6xl mx-auto px-6 py-8 animate-scale-in">
          {/* Back */}
          <button
            onClick={() => setActiveView("dashboard")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к курсам
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-foreground rounded-2xl overflow-hidden mb-4 aspect-video relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={24} className="text-white ml-0.5" />
                  </div>
                  {!isPlaying && (
                    <p className="text-white/50 text-sm">Нажмите для воспроизведения</p>
                  )}
                </div>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-white/70 text-xs bg-black/30 px-2 py-1 rounded-md">
                    {activeCourse.title}
                  </span>
                  <button className="text-white/70 hover:text-white bg-black/30 px-2 py-1 rounded-md text-xs transition-colors">
                    <Icon name="Maximize2" size={12} />
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-white border border-border rounded-2xl p-4">
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>3:24</span>
                    <span>{activeLesson.duration}</span>
                  </div>
                  <div
                    className="relative h-1.5 bg-muted rounded-full cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                      setVideoProgress(Math.min(100, Math.max(0, pct)));
                    }}
                  >
                    <div
                      className="h-full bg-foreground rounded-full transition-all"
                      style={{ width: `${videoProgress}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full shadow"
                      style={{ left: `calc(${videoProgress}% - 6px)` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={16} className="text-background ml-0.5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="SkipBack" size={18} />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="SkipForward" size={18} />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="Volume2" size={18} />
                    </button>
                  </div>

                  {/* Speed control */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground mr-1">Скорость:</span>
                    {speeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaybackSpeed(s)}
                        className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
                          playbackSpeed === s
                            ? "bg-foreground text-background font-medium"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {s}×
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lesson title */}
              <div className="mt-5">
                <h2 className="text-xl font-semibold text-foreground mb-1">{activeLesson.title}</h2>
                <p className="text-sm text-muted-foreground">{activeCourse.instructor} · {activeCourse.title}</p>
              </div>
            </div>

            {/* Lesson list */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Уроки курса</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activeCourse.completedLessons} из {activeCourse.totalLessons} завершено
                  </p>
                  <Progress value={activeCourse.progress} className="h-1 mt-3" />
                </div>

                <div className="divide-y divide-border">
                  {activeCourse.lessons.map((lesson, i) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${
                        activeLesson.id === lesson.id
                          ? "bg-muted"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        lesson.completed
                          ? "bg-foreground"
                          : activeLesson.id === lesson.id
                          ? "border-2 border-foreground"
                          : "border-2 border-border"
                      }`}>
                        {lesson.completed ? (
                          <Icon name="Check" size={11} className="text-background" />
                        ) : (
                          <span className="text-xs text-muted-foreground font-medium">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${
                          activeLesson.id === lesson.id ? "font-medium text-foreground" : "text-foreground/80"
                        }`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-4 border-t border-border">
                  <button className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
                    <Icon name="List" size={14} />
                    Все уроки курса
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}