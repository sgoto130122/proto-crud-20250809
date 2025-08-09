<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

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
        'content',
        'created_at',
        'updated_at'
    ];

    // タイムスタンプ自動管理するかどうか
    public $timestamps = true;
}
