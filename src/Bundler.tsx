import React, {Component} from 'react';
import './App.css';



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


    constructor(props) {
        super(props);
        this.state = {
            system: "EN",
            classes: [],
            matieres: [],
            files: [],
            currentFile: {},
            types:[FileType.Concours,FileType.Cours,FileType.Epreuve,FileType.Examen,FileType.Exercice],

        }

    }

    onAddFile = (event)=>{


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
            this.setState({currentFile:currentFile,matieres:Object.keys(this.corpus[system][classe])});

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

    render() {
        const {system, types,classes, matieres,files, currentFile} = this.state;
        return (
            <form className="text-center border border-light p-5">

                <p className="h4 mb-4">Bundler</p>

                {/*Name of the file*/}

                <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="Name" onChange={this.onChange("name")}/>

                {/*Description of the file*/}
                <div className="form-group">
                    <textarea className="form-control rounded-0" id="description" rows={3}
                              placeholder="Description" onChange={this.onChange("description")}></textarea>
                </div>

                {/*education system of the file*/}
                <label>Système scolaire</label>
                <select className="browser-default custom-select mb-4" onChange={this.onChange("system")}>
                    <option value="EN" selected>Système anglais</option>
                    <option value="FR">Système français</option>
                </select>

                {/*education level of the file*/}
                <label>Niveau scolaire</label>
                <select className="browser-default custom-select mb-4" onChange={this.onChange("classe")}>
                    {
                        classes.map(classe =>(
                            <option value={classe} >{classe}</option>
                        ))
                    }
                </select>

                {/*education class of the file*/}
                <label>Matière scolaire</label>
                <select className="browser-default custom-select mb-4" onChange={this.onChange("matiere")}>
                    {
                        matieres.map(matiere =>(
                            <option value={matiere} >{matiere}</option>
                        ))
                    }
                </select>

                {/*type the file*/}
                <label>Type de document scolaire</label>
                <select className="browser-default custom-select mb-4" onChange={this.onChange("type")}>
                    {
                        types.map(type =>(
                            <option value={type} >{type}</option>
                        ))
                    }
                </select>


                <button className="btn btn-info btn-block" type="submit" onClick={this.onAddFile}>Send</button>

            </form>
        );
    }

}

export default Bundler;
