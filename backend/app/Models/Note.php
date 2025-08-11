<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
{
    use HasFactory;
    use SoftDeletes;

    // テーブル名（複数形と一致していれば省略可）
    protected $table = 'notes';

    // プライマリキー（デフォルトは id）
    protected $primaryKey = 'id';

    // Laravelは created_at, updated_at を自動管理するが、
    // カラム名が違う場合は下記のように設定する
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    // 代入を許可するカラム
    protected $fillable = [
        'title',
        'body',
        // 'created_at',
        'created_by',
        // 'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by'
    ];

    // タイムスタンプ自動管理するかどうか
    // public $timestamps = true;
}
