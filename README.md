# aspect

# Dev Notes

 (todo: just turn this into a parameterized workflow, sheesh. oh hey, I could add this to llamero)

to add node dependencies, emit the following script via ops/misc.sh:

```
#!/bin/bash

MODULE_TO_INSTALL=
cd web && npm install "${MODULE_TO_INSTALL}" && cd ..
```
