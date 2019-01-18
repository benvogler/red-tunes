# Red Tunes

## About
A fun LWC experiment.

## Help

It's recommended that you run the nodemon server while developing so that your changes are automatically pushed to your scratch org. You can run nodemon by first installing the developer dependencies of the project and then using the npm script
```bash
$ npm i
$ npm run nodemon
```
If you have nodemon installed you can just run it like normal
```bash
$ nodemon
```

### Commonly Used Commands

---

#### Create a Lightning Web Component
```bash
sfdx force:lightning:component:create -n <name> --type lwc -d force-app/main/default/lwc
```

##### npm alias
```bash
npm run create:lwc -- <name>
```

This will generate a default LWC with `<name>.js`, `<name>.html`, and `<name>.js-meta.xml`

---