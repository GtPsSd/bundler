import React, {Component} from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


enum FileType{
    Epreuve="Epreuves",
    Cours="Cours",
    Exercice="Exercices",
    Examen="Examen",
    Concours="Concours",
}
class Bundler extends Component<any, any> {

    corpus = {

        EN: {
            from_1: [
                "mathemmatics",
                "sciences"
            ]

            ,
            from_2: []
            ,
            from_3: []
            ,
            from_4: []
            ,
            from_5: []
            ,
            lower_sith: []
            ,
            upper_sith: []
            ,

        },
        FR: {
            sixieme: [
                "mathematiques",
                "physiques",
                "chimie",
                "sciences",
                "ecm",
                "histoire",
                "geographie",
                "francais",
                "anglais",
            ]
            ,
            cinquieme: [
                "mathematiques",
                "physiques",
                "chimie",
                "sciences",
                "ecm",
                "histoire",
                "geographie",
                "francais",
                "anglais",]
            ,
            quatrieme: [
                "mathematiques",
                "physiques",
                "chimie",
                "sciences",
                "ecm",
                "histoire",
                "geographie",
                "francais",
                "anglais",
            ]
            ,
            troisieme: [
                "mathematiques",
                "physiques",
                "chimie",
                "sciences",
                "ecm",
                "histoire",
                "geographie",
                "francais",
                "anglais",]
            ,
            seconde: [
                "mathematiques",
                "physiques",
                "chimie",
                "sciences",
                "ecm",
                "histoire",
                "geographie",
                "francais",
                "anglais",
            ]
            ,
            premiere: [
                "mathematiques",
                "physiques",
                "chimie",
                "sciences",
                "ecm",
                "histoire",
                "geographie",
                "francais",
                "anglais",]
            ,
            terminale: [
                "mathematiques",
                "physiques",
                "chimie",
                "sciences",
                "ecm",
                "histoire",
                "geographie",
                "francais",
                "anglais",
                "philosophie"
            ]
            ,
        }

    };


    ROOT="welearn-storage";
    PATH_SEPARATEUR="/";
    NAME_SEPARATEUR="-";
    emptyFile = {type:"",classe:"",system:"",matiere:"",name:"",description:""};

    constructor(props) {
        super(props);
        this.state = {
            system: "EN",
            classes: [],
            matieres: [],
            files: [],
            zip: new JSZip(),
            currentFile: this.emptyFile ,
            types:[FileType.Concours,FileType.Cours,FileType.Epreuve,FileType.Examen,FileType.Exercice],

        }

    }

    onAddFile = (event)=>{

        let {files,currentFile} = this.state;
        files.push(currentFile);
        this.setState({files:files, currentFile:this.emptyFile});
    };
    onChange = (name) =>(event) =>{

        if(name==="system"){
            let {currentFile} = this.state;
            const system = event.target.value;
            currentFile[name] = system;
            this.setState({system:system,currentFile:currentFile,classes:Object.keys(this.corpus[system])});
        }else if(name==="classe"){
            let {currentFile,system} = this.state;
            const classe = event.target.value;
            currentFile[name] = classe;
            this.setState({currentFile:currentFile,matieres:this.corpus[system][classe]});

        }else if(name==="matiere"){
            let {currentFile,system} = this.state;
            const matiere = event.target.value;
            currentFile[name] = matiere;
            this.setState({currentFile:currentFile});

        }else if(name==="name"){
            let {currentFile} = this.state;
            const val = event.target.value;
            currentFile[name] = val;
            this.setState({currentFile:currentFile});

        }else if(name==="description"){
            let {currentFile} = this.state;
            const val = event.target.value;
            currentFile[name] = val;
            this.setState({currentFile:currentFile});

        }else if(name==="type"){
            let {currentFile} = this.state;
            const val = event.target.value;
            currentFile[name] = val;
            this.setState({currentFile:currentFile});

        }
    };

    uploadFile= event =>{

        const {zip} = this.state;
        const file = event.target.files[0];
        zip.file(this.ROOT+this.PATH_SEPARATEUR+this.getPath(this.PATH_SEPARATEUR)+this.PATH_SEPARATEUR+this.getPath(this.NAME_SEPARATEUR)+this.NAME_SEPARATEUR+file.name,file)

    };

    onCreateBundle = event=>{

        const {files,zip} = this.state;
        const blob = new Blob([JSON.stringify(files)], {type: "application/json"});
        zip.file(this.ROOT+this.PATH_SEPARATEUR+this.ROOT+".json",blob);
        zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content, "welearn.zip");
        });
    };

    getPath=(separator: string)=>{
      const {currentFile} = this.state;
      return currentFile.system+separator+currentFile.classe+separator+currentFile.matiere+separator+currentFile.type;
    };
    render() {
        const {system, types,classes, matieres,files, currentFile} = this.state;
        return (
            <div>
                <form className="text-center border border-light p-5">

                    <p className="h4 mb-4">Bundler</p>

                    {/*Name of the file*/}
                    <div className="form-group">
                        <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="Name" onChange={this.onChange("name")}/>

                    </div>


                    {/*Description of the file*/}
                    <div className="form-group">
                    <textarea className="form-control rounded-0" id="description" rows={3}
                              placeholder="Description" onChange={this.onChange("description")}></textarea>
                    </div>

                    {/*education system of the file*/}
                    <div className="form-group">
                        <label>Système scolaire</label>
                        <select className="browser-default custom-select mb-4" onChange={this.onChange("system")}>
                            <option value="EN" selected>Système anglais</option>
                            <option value="FR">Système français</option>
                        </select>
                    </div>


                    {/*education level of the file*/}
                    <div className="form-group">
                        <label>Niveau scolaire</label>
                        <select className="browser-default custom-select mb-4" onChange={this.onChange("classe")}>
                            {
                                classes.map(classe =>(
                                    <option value={classe} >{classe}</option>
                                ))
                            }
                        </select>
                    </div>


                    {/*education class of the file*/}
                    <div className="form-group">
                        <label>Matière scolaire</label>
                        <select className="browser-default custom-select mb-4" onChange={this.onChange("matiere")}>
                            {
                                matieres.map(matiere =>(
                                    <option value={matiere} >{matiere}</option>
                                ))
                            }
                        </select>
                    </div>


                    {/*type the file*/}
                    <div className="form-group">
                        <label>Type de document scolaire</label>
                        <select className="browser-default custom-select mb-4" onChange={this.onChange("type")}>
                            {
                                types.map(type =>(
                                    <option value={type} >{type}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="file-upload-wrapper">
                            <input type="file" id="input-file-now" className="file-upload" onChange={this.uploadFile}/>
                        </div>
                    </div>




                </form>
                <button className="btn btn-info" onClick={this.onAddFile}>Send</button>
                <button className="btn btn-primary" onClick={this.onCreateBundle}><i className="fas fa-file-archive"></i> Bundle</button>
            </div>

        );
    }

}

export default Bundler;
