import { notify } from '@kyvg/vue3-notification';

export const copy = (word: string) => {
    const textArea: HTMLTextAreaElement = document.createElement('textarea');
    textArea.value = word;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    notify({
        duration: 1000,
        text: 'Скопировано в буфер обмена',
        type: 'success',
    });
};

export const getSecondsDiff = (d1: Date, d2: Date): number => {
    const diff = (d2.getTime() - d1.getTime()) / 1000;
    return Math.abs(Math.round(diff));
};
