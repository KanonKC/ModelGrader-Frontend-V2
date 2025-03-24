import { Badge } from "../components/shadcn/Badge"

export const ProgrammingLanguageOptions = [
    {
        value: 'c',
        label: 'C',
        badge: <Badge className="bg-[#2B7FFE]">C</Badge>
    },
    {
        value: 'cpp',
        label: 'C++',
        badge: <Badge className="bg-[#00589C]">C++</Badge>
    },
    {
        value: 'python',
        label: 'Python',
        badge: <Badge className="bg-[#306998]">Python</Badge>
    },
    {
        value: 'javascript',
        label: 'Javascript',
        badge: <Badge className="bg-[#F0DB4F]">Javascript</Badge>
    },
]

export const ProgrammingLanguageLabel:{
    [key: string]: string
} = {
    'c': 'C',
    'cpp': 'C++',
    'python': 'Python',
    'javascript': 'Javascript'
}

export type ProgrammingLanguage = "py" | "c" | "cpp";

export const ProgrammingLanguageLabelTable: {
    [key in ProgrammingLanguage]: string;
} = {
    py: "Python",
    c: "C",
    cpp: "C++",
}

export const ProgrammingLanguageOptionList = Object.keys(ProgrammingLanguageLabelTable).map((key) => ({
    value: key,
    label: ProgrammingLanguageLabelTable[key as ProgrammingLanguage]
}))

export const ProgrammingLanguageMonacoOptionList = [
    {
        value: 'python',
        defaultValue: 'py',
        label: 'Python'
    },
    {
        value: 'c',
        defaultValue: 'c',
        label: 'C'
    },
    {
        value: 'cpp',
        defaultValue: 'cpp',
        label: 'C++'
    },
]