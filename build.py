import os
import shutil


class bcolors:
    DANGER = '\x1b[0;31;40m'
    SUCCESS = '\x1b[0;32;40m'
    WARNING = '\x1b[0;33;40m'
    INFO = '\x1b[0;34;40m'
    PURPLE = '\x1b[0;35;40m'
    LIGHTGREEN = '\x1b[0;36;40m'
    WHITE = '\x1b[0;37;40m'
    ENDC = '\x1b[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


# Path for the downloaded themes
targetPath = os.getcwd() + "/themes"
# Destination path for JS and SCSS theme files
jsThemePath = os.getcwd() + "/src/js/themes"
sassThemePath = os.getcwd() + "/src/sass/themes"
# Paths for config.js and src/sass/themes/index.scss files
configFile = os.getcwd() + "/src/js/config.js"
sassIndexFile = os.getcwd() + "/src/sass/themes/_index.scss"


# Clear themes directories
jsThemesList = [theme for theme in os.listdir(jsThemePath)]
sassThemesList = [theme for theme in os.listdir(sassThemePath)]


# Clear themes directories
for themeFile in jsThemesList:
    os.remove(os.path.join(jsThemePath, themeFile))
for themeFile in sassThemesList:
    if themeFile != "_index.scss":
        os.remove(os.path.join(sassThemePath, themeFile))


# Get all themes
themes = os.listdir(targetPath)


# Move all the available themes from themes/ dir to src/ dir
for theme in themes:
    themePath = targetPath + '/' + theme
    themeFilesList = os.listdir(themePath)

    if 'js' in themeFilesList:
        targetJsPath = themePath + '/js'

        # Change directory to target path and copy theme files
        os.chdir(targetJsPath)
        for file in os.listdir():
            shutil.copy(file, jsThemePath)

    if 'sass' in themeFilesList:
        targetSassPath = themePath + '/sass'

        # Change directory to target path and copy theme files
        os.chdir(targetSassPath)
        for file in os.listdir():
            shutil.copy(file, sassThemePath)


# Shows the theme options in terminal
def selectTheme(options, name):
    index = 0
    indexValidList = []

    print(f"Select a {name} you want to use:\n")

    for option in options:
        index = index + 1
        indexValidList.extend([options[option]])
        print('    ' + str(index) + ') ' + option)
    inputValid = False

    while not inputValid:
        inputRaw = input(f"\n{bcolors.INFO}Enter a number:{bcolors.ENDC} ")
        inputNo = int(inputRaw) - 1

        if inputNo > -1 and inputNo < len(indexValidList):
            selected = indexValidList[inputNo]
            print(f"\n{bcolors.SUCCESS}Selected {name}:{bcolors.ENDC} {selected}")
            inputValid = True
            break
        else:
            print(f"{bcolors.DANGER}Please select a valid {name} number{bcolors.ENDC}")

    return selected


# Get available themes - checks the src/sass/themes dir
availableThemes = os.listdir(sassThemePath)
availableJsThemes = os.listdir(jsThemePath)
# Create options dict
options = {}

# Assign keys and values into options dict
for theme in availableThemes:
    name, ext = os.path.splitext(theme)
    name = name.split("_")
    if name[1] != 'index':
        options[name[1]] = name[1]

# The selected option - SCSS file name
option = selectTheme(options, 'theme')


# Extract JS file name if there were SCSS theme variants e.g light and dark versions
splitOption = option.split('.')
if len(availableThemes) > len(availableJsThemes) and len(splitOption) > 1:
    jsFileName = splitOption[0]
else:
    jsFileName = option

# Finally edit config and themes/index.scss files to add the selected themes
with open(configFile, "r") as file:
    data = file.readlines()

data[len(data) - 1] = f'export const THEME = "{jsFileName}";'

with open(configFile, "w") as file:
    file.writelines(data)

with open(sassIndexFile, "w") as file:
    file.writelines(f'@forward "{option}";')
