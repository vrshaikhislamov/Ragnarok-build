//Variables
class Mechanics {
    constructor() {
        this.max_number = 160;
        this.max_stat = 99;
        this.stats = [];
        this.refine_table = [];
        this.refine_table[3] = { level: 7, safe: 4, bonus: 12 };
        this.refine_table[4] = { level: 13, safe: 4, bonus: 18 };

        this.classes = window.ro_classes;

        this._init();
    }
    CalcStat(val, name) {
        switch(name) {
            case "matk.min": {
                return (val + 10) + Math.floor((val + 10) * (val + 10) / 49);
            }
            case "matk.min.formula": {
                return `(int + 10) + Floor((int + 10) * (int + 10) / 49)`;
            }
            case "matk.max": {
                return (val + 10) + Math.floor((val + 10) * (val + 10) / 36);
            }
            case "matk.max.formula": {
                return `(int + 10) + Floor((int + 10) * (int + 10) / 36)`;
            }
            default: return null;
        }
    }
    CalcMatk(matk, bonusMtk, factor, refine) {
        return (matk + bonusMtk) * factor + refine;
    }
    CalcRefine(refine, weapon_lvl) {
        let ref = this.refine_table[weapon_lvl];
        return refine * ref.level + ((refine > ref.safe) ? (refine - ref.safe) : 0) * ref.bonus;
    }
    _init() {
        for(let i = 0; i < this.max_number; i++) {
            this.stats.push = i;
        }
    }
}

class Hero {
    constructor(name, mechanics) {
        this._mechanics = mechanics;
        this._name = name;
        this._class = this._mechanics.classes.filter(x => x.name == "Soul Linker")[0];
        this._base = {};
        this._base.level = 1;
        this._base.job_level = 1;
        this._base.points = 48;
        this._base.str = 1;
        this._base.agi = 1;
        this._base.vit = 1;
        this._base.int = 1;
        this._base.dex = 1;
        this._base.luk = 1;
    }

    get Name() {
        return this._name;
    }

    set Name(value) {
        if (value.length < 4 || value.length > 20) throw new Error("Имя должно быть длиннее 4 букв и меньше 20 букв");
        this._name = value;
    }

    get Matk_min() {
        return this._mechanics.CalcStat(this.Int, "matk.min");
    }

    get Matk_max() {
        return this._mechanics.CalcStat(this.Int, "matk.max");
    }

    get Str() {
        return this._base.str + this._getBonus("job.str");
    }
    set Str(value) {
        this._setBaseStat(this, value, "str");    
    }
    get Vit() {
        return this._base.vit + this._getBonus("job.vit");
    }
    set Vit(value) {
        this._setBaseStat(this, value, "vit");    
    }
    get Luk() {
        return this._base.luk + this._getBonus("job.luk");
    }
    set Luk(value) {
        this._setBaseStat(this, value, "luk");    
    }
    get Int() {
        return this._base.int + this._getBonus("job.int");
    }
    set Int(value) {
        this._setBaseStat(this, value, "int");    
    }
    get Dex() {
        return this._base.dex + this._getBonus("job.dex");
    }
    set Dex(value) {
        this._setBaseStat(this, value, "dex");    
    }
    get Agi() {
        return this._base.agi + this._getBonus("job.agi");
    }
    set Agi(value) {
        this._setBaseStat(this, value, "agi");    
    }
    _setBaseStat(context, value, stat) {
        let val = value - context._base[stat];
        if (val > 0) {
            if (value > 99) return;
            if (context._base.points < val) throw new Error(`Не хватает очков характеристик для повышения ${stat}!`);
            context._base.points -= val;
            context._base[stat] = value;
        } else {
            if (value < 1) return;
            context._base.points += Math.abs(val);
            context._base[stat] = value;
        }
    }

    _getBonus(name) {
        switch(name) {
            case "job.str": {
                return this._class.job_bonus[this._base.job_level][0];
            }
            case "job.vit": {
                return this._class.job_bonus[this._base.job_level][1];
            }
            case "job.luk": {
                return this._class.job_bonus[this._base.job_level][2];
            }
            case "job.int": {
                return this._class.job_bonus[this._base.job_level][3];
            }
            case "job.dex": {
                return this._class.job_bonus[this._base.job_level][4];
            }
            case "job.agi": {
                return this._class.job_bonus[this._base.job_level][5];
            }
            default: return 0;
        }
    }

    DrawStats(selector) {
        let container = document.querySelector(selector);
        if(!container) return;
        let displayBlocks = [];
        //LEVEL
        displayBlocks.push({ class: "base", name: "Level", text: `${this._base.level}`, formulas: [`Базовый уровень`]});
        //JOB LEVEL
        displayBlocks.push({ class: "base", name: "Job", text: `${this._base.job_level}`, formulas: [`Уровень профессии`]});
        //INT
        displayBlocks.push({ class: "calc", name: "INT", text: `${this.Int}`, formulas: [
            `INT = ${this._base.int} (base) + ${this._getBonus("job.int")} (job)`
        ]});
        //MATK
        displayBlocks.push({ class: "calc", name: "MATK", text: `${this.Matk_min} - ${this.Matk_max}`, 
            formulas: [
                `MATK(Min) = ${this._mechanics.CalcStat(null, "matk.min.formula")}`,
                `MATK(Max) = ${this._mechanics.CalcStat(null, "matk.max.formula")}`
            ]});
        container.innerHTML = `<div class="hero-info">${this.Name} [${this._class.name}]</div>`;
        container.innerHTML += displayBlocks.map(block => `<div class="stat ${block.class}">
                                                            <div class="name">${block.name}</div>
                                                            <div class="text">${block.text}</div>
                                                            <span class="tooltiptext">${block.formulas.join('</br>')}</span>
                                                        </div>`).join('');
    }
}
