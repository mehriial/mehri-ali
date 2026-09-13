import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx";

function AdminTable({
                        columns = [],
                        data = [],
                        getRowKey = (row) => row.id,
                        actions,
                        emptyMessage = "Gösterilecek kayıt bulunamadı.",
                    }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <Table>
                <TableHeader>
                    <TableRow className="border-white/[0.08] hover:bg-transparent">
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                                className="h-12 px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30"
                            >
                                {column.label}
                            </TableHead>
                        ))}

                        {actions && (
                            <TableHead className="w-[120px] px-5 text-right text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                                İşlemler
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length > 0 ? (
                        data.map((row) => (
                            <TableRow
                                key={getRowKey(row)}
                                className="border-white/[0.06] transition-colors hover:bg-white/[0.025]"
                            >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        className="px-5 py-4 text-sm text-white/70"
                                    >
                                        {column.render
                                            ? column.render(row, column)
                                            : row[column.key] ?? "-"}
                                    </TableCell>
                                ))}

                                {actions && (
                                    <TableCell className="px-5 py-4 text-right">
                                        {actions(row)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="border-0 hover:bg-transparent">
                            <TableCell
                                colSpan={
                                    columns.length + (actions ? 1 : 0)
                                }
                                className="h-32 text-center text-sm text-white/30"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminTable;