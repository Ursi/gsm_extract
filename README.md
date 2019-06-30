### What It Does
For each submodule folder specified in `gsm_extractor.json`, GSM Extract moves its contents into the enclosing folder.
If GSME finds a `gsm_extractor.json` file in one of the submodule folders, it will perfom an extraction there first.

### How to Run
Add GSME as a submodule in the root directory and run `gsm_extract.js` from there. If run with no arguments, the files inside the submodule
folders are copied to their enclosing folder's directory. If run with the `-h` flag, the enclosing folders are deleted, as well as the
`.gitmodules` and `gsm_extract.json` folder.

### `gsm_extractor.json`
```
{
	"dir containing submodules": [
		"submodule dir 1",
		"submodule dir 2",
		...
	]
}
```
Instead of an array of submodules, you can also specify the string `"all"` to extract from overy folder in that directory.
