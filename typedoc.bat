rmdir /s /q "./docs"

call ./node_modules/.bin/typedoc.cmd ./src/game_library.ts

pause
