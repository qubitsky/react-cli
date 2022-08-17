/**
 * English locale
 */

const locale = {
  common: {
    path: 'Path',
    reset: 'reset',
    newFolder: 'new folder',
    select: 'Select',
    connect: 'Connecting from UI server',
    disconnect: 'Disconnected from UI server',
    logs: 'Logs'
  },
  project: {
    headerTitle: '前端项目管理器',
    projects: '项目',
    create: '创建',
    import: '导入',
    notFoundProjects: 'No existing projects',
    folders: '文件夹',
    createNewProject: '创建一个新的项目',
    importProject: '导入项目',
    favoriteProjects: '收藏的项目',
    otherProjects: '其他项目',
    emptyFavoriteFolders: 'Empty favorite folders',
    openEditor: 'Open in editor',
    projectManagerReact: 'Project Manager React'
  },
  projectCreate: {
    createProjectTitle: '创建新的项目',
    nameProject: '项目文件夹',
    createProject: '创建项目',
    packageManager: '包管理器',
    selectPreset: '选择命令',
    typeName: '输入项目名称',
    creatingProject: '创建项目'
  },
  dashboard: {
    dashboard: 'Dashboard',
    dependencies: 'Dependencies',
    tasks: 'Tasks',
    titleDashboar: 'Project dashboard',
    titleTasks: 'Project tasks'
  },
  dependencies: {
    titleDepend: 'Project dependencies',
    main: 'Main dependencies',
    dev: 'Development dependencies',
    version: 'version',
    installed: 'installed',
    noInstalled: 'not installed',
    notFoundDependencies: 'Dependencies not found',
    moreInfo: 'More info',
    install: 'Install dependency',
    update: 'Update all dependencies',
    type: 'Type',
    search: 'Search',
    npmInstall: 'Install',
    npmUninstall: 'Uninstall'
  },
  modal: {
    selectFolder: 'Select folder',
    createNew: 'Create new folder',
    titleDepend: 'Install new dependency',
    create: 'Create',
    title: 'title',
    newFolder: 'New folder',
    install: 'Install',
    cancel: 'Cancel'
  },
  welcometips: {
    blot: 'Welcome tips',
    welcome: 'Welcome to your new project!',
    tip1: 'You are looking at the project dashboard where you can put widgets. Use the "Customize" button to add more! Everything is automatically saved.',
    tip2: 'On the left are the different available pages. "Plugins" let you add new React CLI plugins, "Dependencies" for managing the packages, "Configuration" to configure the tools and "Tasks" to run scripts (for example webpack).',
    tip3: 'Return to the project manager with the dropdown at the top left of the screen or the home button in the status bar at the bottom.'
  },
  toolbar: {
    projects: {
      add: 'Add / remove to favorites',
      edit: 'Rename',
      delete: 'Delete',
      tasks: 'Tasks',
      open: 'Open in editor',
      noData: 'No data'
    },
    tooltip: {
      back: 'Back',
      folder: 'Beginning',
      path: 'Specified path',
      update: 'Update',
      favorite: 'Add to favorites',
      newFolder: 'Create new folder'
    }
  }
}

export default locale
