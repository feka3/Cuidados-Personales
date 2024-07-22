function confirmationCancel({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm">
                <p className="text-lg font-semibold mb-4">{message}</p>
                <div className="flex justify-end">
                    <button onClick={onCancel} className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Cancelar</button>
                    <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg">Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default confirmationCancel;
