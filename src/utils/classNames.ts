export default function classNames(...input: Array<string>) {
    return input.filter(Boolean).join(" ");
}